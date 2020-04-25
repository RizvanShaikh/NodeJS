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


/*****************/
// [validators.requiredCheck,appUtil.convertPass],
// upload.array('userImage', 3), multiple image upload 
// usrRoutr.route('/register')
//     .post([upload.array('userImage[]', 3), validators.validateRegister, appUtil.convertPass], (req, res) => {
//         let userObj = req.body;
//         let imageArray = req.files;
//         console.log(imageArray, "req.files")
//         let referralCode = req.body.referralCode;
//         console.log(userObj, imageArray, "34")
//         usrFacade.signup(userObj, referralCode, imageArray)
//             .then((result) => {
//                 resHndlr.sendSuccess(res, result);
//             }).catch((err) => {
//                 resHndlr.sendError(res, err);
//             })
//     });



module.exports = usrRoutr;

// localhost:4009/SchoolManagementSystem/api/v1/user/resetpassword/h1plXKyibxCtt6qp9o8vkic2t126uleH?new_password=123123&reagain_password=123123
/*
 * when you create and want to send file in mail
 * select the "form-data" & don't select anything in headers.
 *
 * token will be in req.params & password will be in req.query
 *
 */