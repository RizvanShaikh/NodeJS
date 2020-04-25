const usrRoutr = require('express').Router();

// importing module
const validators = require('./userValidators');
const appUtil = require('../appUtils');
const usrFacade = require('./userFacade');
const resHndlr = require('../responseHandler');
const userModel = require('./model');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const userConst = require('./userConstants');

// for upload an images
/******multiple file************/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './lib/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, + new Date() + file.originalname);
    }
});
const upload = multer({
    storage: storage,
});
/*****************/
// [validators.requiredCheck,appUtil.convertPass],
// upload.array('userImage', 3), multiple image upload 
usrRoutr.route('/register')
    .post([upload.array('userImage[]', 3), validators.validateRegister, appUtil.convertPass], (req, res) => {
        let userObj = req.body;
        let imageArray = req.files;
        console.log(imageArray, "req.files")
        let referralCode = req.body.referralCode;
        console.log(userObj, imageArray, "34")
        usrFacade.signup(userObj, referralCode, imageArray)
            .then((result) => {
                resHndlr.sendSuccess(res, result);
            }).catch((err) => {
                resHndlr.sendError(res, err);
            })
    });

usrRoutr.route('/login')
    .post([validators.validateLogin], (req, res) => {
        let userObj = {
            email,
            password,
        } = req.body;
        usrFacade.login(userObj).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });

usrRoutr.route('/resetPassword/:token')
    .get([validators.checkResetPassword], (req, res) => {
        try {
            userModel.findOne({ resetPasswordToken: req.params.token })
                .then((userData) => {
                    if (userData == null) {
                        //if not found the return the error invalid token
                        return res.json({ code: 404, message: userConst.MESSAGES.invalidToken })
                    } else {
                        // we will convert time to unreadable formate
                        let currentDateTime = + new Date()
                        // Set the new password after the hash generation and null the reset timeout & token
                        if (userData.resetPasswordTimeout > currentDateTime) {
                            return bcrypt.hash(req.query.new_password, 10).then((newPassword) => {
                                userData.resetPasswordTimeout = null;
                                userData.resetPasswordToken = null;
                                userData.password = newPassword;
                                userData.save();
                                return res.json({ code: 200, message: userConst.MESSAGES.passwordUpdate })
                            }).catch((err) => {
                                return err;
                            })
                        } else {
                            return res.json({ code: 404, message: userConst.MESSAGES.resetPassswordLInkExpire })
                        }
                    }
                })
        } catch (err) {
            return err;
        }
    });

usrRoutr.route('/forgotPassword')
    .post((req, res) => {
        let email = req.body
        usrFacade.findUserforForgotPassword(email)
            .then((User) => {
                // here we will get user data from the data base using email
                if (User) {
                    usrFacade.sendForgotPasswordMail(User).then(result => {
                        if (result.error) {
                            resHndlr.sendError(res, result.error);
                        } else {
                            resHndlr.sendSuccess(res, result);
                        }
                    });
                }
            }).catch(err => {
                return err;
            })
    });
// you can see users by userType
usrRoutr.route('/usersList')
    .post((req, res) => {
        let userData = req.body;
        usrFacade.userData(userData).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });
// all user list
usrRoutr.route('/allusersList')
    .get((req, res) => {
        usrFacade.allUserData().then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });
// admin can edite user data as well as course data
usrRoutr.route('/adminEdit')
    .put((req, res) => {
        let userDataByAdmin = req.body; // user data in req.body
        let adminToken = req.headers.authorization;
        usrFacade.adminAuthorityToUpdate(userDataByAdmin, adminToken).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });
// admin can delete courses as well as user profile
usrRoutr.route('/adminDelete')
    .post((req, res) => {
        // can be useror course
        let data = req.body;
        let adminToken = req.headers.authorization;
        usrFacade.adminAuthorityToDelete(data, adminToken).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });

module.exports = usrRoutr;

// localhost:4009/SchoolManagementSystem/api/v1/user/resetpassword/h1plXKyibxCtt6qp9o8vkic2t126uleH?new_password=123123&reagain_password=123123
/*
 * when you create and want to send file in mail
 * select the "form-data" & don't select anything in headers.
 *
 * token will be in req.params & password will be in req.query
 *
 */