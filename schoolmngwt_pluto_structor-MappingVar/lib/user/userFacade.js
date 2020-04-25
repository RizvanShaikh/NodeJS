'use strict';

const usrService = require('./userService');
const AppUtil = require('../appUtils');
const jwtHandler = require('../jwtHandler');
const userMapper = require('./userMapper');
const config = require('../config');
const userConst = require('./userConstants');
/**
 * @function signup
 * signup via email
 */
function signup(signupInfo, referralCode, imageArray) {
    return usrService.signupUser(signupInfo, referralCode, imageArray)
        .then((result) => {
            return result;
        });
}
/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */
function login(loginInfo) {
    // after searching in data base(using findOne query) it will give output from the data base
    return usrService.isUserExist(loginInfo)
        .then(function (isExist) {
            console.log(isExist, "from the userFacade 28")
            if (isExist) {
                return AppUtil.verifyPassword(loginInfo, isExist).then((valid) => {
                    if (valid) {
                        return jwtHandler.genUsrToken({ password: isExist.password, userId: isExist._id, email: isExist.email }).then((jwt) => {
                            isExist.token = jwt; 
                            isExist.save();
                            let successfullyLogin = userConst.MESSAGES.successfullyLogin;
                            let responseCode = userConst.STATUS_CODE.SUCCESS;
                            return userMapper.loginMapping({ user: isExist, jwt: jwt }, successfullyLogin, responseCode);
                        });
                    } else {
                        let incorrectPW = userConst.MESSAGES.incorrectPW;
                        let errorPW = userConst.STATUS_CODE.ERRORPW;
                        return userMapper.passwordMismatch(incorrectPW, errorPW);
                    }
                });
            } else {
                let userNotFound = userConst.MESSAGES.userNotFound;
                let error = userConst.STATUS_CODE.ERROR;
                return userMapper.userNotExist(userNotFound, error);
            }
        });

}

async function sendForgotPasswordMail(User) {
    // it  will generate the rendom string
    let ResetPasswordToken = await AppUtil.generateResetPassordToken();
    User.resetPasswordToken = ResetPasswordToken;
    let currentDateTime = new Date();
    // set Time 1hr for the
    User.resetPasswordTimeout = currentDateTime.setTime(currentDateTime.getTime() + 1 * 3600 * 1000)
    return User.save()
        .then((User) => {
            //Make link
            let link = `localhost:${config.cfg.port}/SchoolManagementSystem/api/v1/user/resetpassword/${ResetPasswordToken}`;
            //Now send the mail with link
            usrService.resetPasswordLinkMailer(User.email, link);
          
            return { code: 201,  message: userConst.MESSAGES.resetPasswordLink }
        })
        .catch(error => {
            return { code: 404, message: userConst.MESSAGES.passwordLinkNotSend  }
        })
}

function findUserforForgotPassword(email) {
    return usrService.userforForgotPassword(email)
}

function userData(userData) {
    return usrService.usrDataDisplay(userData);
}

function allUserData() {
    return usrService.allUsrDataDisplay();
}
function adminAuthorityToUpdate(userDataByAdmin, adminToken) {
    return usrService.adminAuthorityToEdit(userDataByAdmin, adminToken)
}

function adminAuthorityToDelete(Data, adminToken) {
    return usrService.adminAuthorityDelete(Data, adminToken)
}
//========================== Export Module Start ==============================
module.exports = {
    signup,
    login,
    findUserforForgotPassword,
    sendForgotPasswordMail,
    userData,
    allUserData,
    adminAuthorityToUpdate,
    adminAuthorityToDelete,
};
//========================== Export Module End ===============================
/**
 * send_forgot_password_mail():- we will send an email. in email we will
 * send random string and reset password
 *
 * when data doesn't get from the
 */