const usrRoutr = require('express').Router();

// importing module
const validators = require('./userValidators');
const appUtil = require('../appUtils');
const usrFacade = require('./userFacade');
const resHndlr = require('../responseHandler');
const userModel = require('./model');
const bcrypt = require('bcryptjs');
const multer = require('multer');

// for upload an images
/******multiple file************/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './lib/uploads/')
    },
    filename: function (req, file, cb) {
        // console.log(file, "file.originalname from the userRoute 17")
        cb(null, + new Date() + file.originalname);
    }
});
const upload = multer({
    storage: storage,
});
/*****************/
// [validators.requiredCheck,appUtil.convertPass],
// upload.array('userImage', 3),
usrRoutr.route('/createUser')
    .post([upload.array('userImage', 3), validators.requiredCheck, appUtil.convertPass], (req, res) => {
        let userObj = req.body;
        var imageArray = req.files;

        let refferalCodeRandom = req.body.referralCode;
        usrFacade.signup(userObj, refferalCodeRandom, imageArray)
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

usrRoutr.route('/resetpassword/:token')
    .get([validators.checkResetPassword], (req, res) => {
        try {
            userModel.findOne({ resetPasswordToken: req.params.token })
                .then((userData) => {
                    if (userData == null) {
                        //if not found the return the error invalid token
                        return res.json({ success: 0, message: 'Invalid Token.' })
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
                                return res.json({ success: 1, message: 'Password updated successfully!.' })
                            }).catch((err) => {
                                return err;
                            })
                        } else {
                            return res.json({ success: 0, message: 'Reset password link has been expired!.' })
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
        usrFacade.find_user_for_forgot_password(email)
            .then((User) => {
                // here we will get user data from the data base using email
                if (User) {
                    usrFacade.send_forgot_password_mail(User).then(result => {
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
// you can see all users
usrRoutr.route('/listOfUser')
    .get((req, res) => {
        let userData = req.body;
        usrFacade.user_Data(userData).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });

// admin can edite user data as well as course data
usrRoutr.route('/adminRoute')
    .put((req, res) => {
        userDataByAdmin = req.body; // user data in req.body
        adminToken = req.headers.authorization;
        usrFacade.admin_Power(userDataByAdmin, adminToken).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });
// admin can delete courses as well as user profile
usrRoutr.route('/adminCanDelete')
    .post((req, res) => {
        // can be useror course
        data = req.body;
        adminToken = req.headers.authorization;
        usrFacade.admin_Can_Delete(data, adminToken).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    });
// if invalid route 
// usrRoutr.route('*')
//  .all((req, res) => {
//     return res.json({
//         code: 404,
//         message: "Invalid route!."
//     })
// });
//app.post('/makUnFavCourses', (req, res) => CoursesAction.makUnFavCourses(req, res));
// app.all('*', (req, res) => {
//     return res.json({
//         code: 404,
//         message: "Invalid route."
//     })
// });
module.exports = usrRoutr;

// localhost:4009/SchoolManagementSystem/api/v1/user/resetpassword/h1plXKyibxCtt6qp9o8vkic2t126uleH?new_password=123123&reagain_password=123123
/*
 * when you create and want to send file in mail
 * select the "form-data" & don't select anything in headers.
 *
 * token will be in req.params & password will be in req.query
 *
 * https://ciphertrick.com/read-excel-files-convert-json-node-js/
 */