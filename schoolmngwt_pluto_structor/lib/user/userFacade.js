'use strict';


const usrService = require('./userService');
const AppUtil = require('../appUtils');
const jwtHandler = require('../jwtHandler');
const userMapper = require('./userMapper');
const model = require('./model');
const config = require('../config');
/**
 * @function signup
 * signup via email
 */

function signup(signupInfo, refferalCode, imageArray) {
    return usrService.signupUser(signupInfo, refferalCode, imageArray)
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
            if (isExist) {
                return AppUtil.verifyPassword(loginInfo, isExist).then((valid) => {
                    if (valid) {
                        return jwtHandler.genUsrToken({ password: isExist.password, userId: isExist._id, email: isExist.email }).then((jwt) => {
                            isExist.token = jwt; isExist.save();
                            return userMapper.loginMapping({ user: isExist, jwt: jwt });
                        });
                    } else {
                        return userMapper.passwordMismatch();
                    }
                });
            } else {
                return userMapper.userNotExist();
            }
        });

}

function find_user_for_forgot_password(email) {
    console.info('Find user from email');
    return usrService.return_user_for_forgot_password(email)
}

async function send_forgot_password_mail(User) {
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
            usrService.ResetPasswordLinkMailer(User.email, link);
            return { success: 1, message: 'Reset Password link has been send to your mail!.' }
        })
        .catch(err => {
            return { success: 0, error: 1, message: "Reset Password link couldn't not be send!." }
        })
}

function send_mail(email, updated_password) {
    return usrService.send_mail(email, updated_password);

}

function user_Data(userData) {
    return usrService.usr_Data_Display(userData);
}


function admin_Power(userDataByAdmin, adminToken) {
    return usrService.admin_Power_To_Change(userDataByAdmin, adminToken)
}

function admin_Can_Delete(Data, adminToken) {
    return usrService.admin_Can_Delete_any(Data, adminToken)
}
//========================== Export Module Start ==============================

module.exports = {
    signup,
    login,
    send_mail,
    find_user_for_forgot_password,
    send_forgot_password_mail,
    user_Data,
    admin_Power,
    admin_Can_Delete,

};
//========================== Export Module End ===============================
/**
 * send_forgot_password_mail():- we will send an email. in email we will
 * send random string and reset password
 *
 * when data doesn't get from the
 */