'use strict';

const userDao = require('./userDao');
const userMapper = require('./userMapper');
const AppUtil = require('../appUtils');
const nodemailer = require('nodemailer');

// for creating user 
function signupUser(usrDetails, refferalCode, imageInArray) {

    return userDao.checkIfExist(usrDetails).then((exist) => {

        if (exist) {
            return userMapper.userExist();

        } else {

            var userData = userDao.registerUser(usrDetails, refferalCode, imageInArray)

            return userMapper.registerMapping(userData);
        }
    });

}

// for login user
function isUserExist(details) {

    return userDao.checkIfExist(details)
        .then((result) => {
            return result;
        });
}

// return_user_for_forgot_password
function return_user_for_forgot_password(body) {

    return userDao.checkIfExist(body)
        .then((exist) => {

            if (exist) return exist;
            else return null;
        })
        .catch(err => {

            return err;
        })
}
//========for email throught send password=========
function send_mail(email, new_password) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rizwan@webcluesinfotech.com',
            pass: 'rizwan1994'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: 'rizwan@webcluesinfotech.com',
        to: 'rizwanshaikh8085@gmail.com', // list of receivers

        subject: 'New Password request', // Subject line
        text: 'Please find your new password.', // plain text body
        html: `<b> ${new_password}</b>` // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return userMapper.internalServerError();

        } else {
            return userMapper.emailSent();
        }
    });
}
//=====================
//====== for ResetPassword Link it will send email =========
function ResetPasswordLinkMailer(email, link) {
    // console.info('Going to send email to your emailId');
    // console.log('Link(ResetPasswordLinkMailer):', link);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rizwan@webcluesinfotech.com',
            pass: 'rizwan1994'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let mailOptions = {
        from: 'rizwan@webcluesinfotech.com',
        to: 'rizwan@webcluesinfotech.com', // list of receivers

        subject: 'Reset Password Link', // Subject line
        text: 'Please use below link to set new Password.', // plain text body
        html: `<b>Link: </b><a href='${link}'>Reset</a> \n Url: ${link}`// html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return userMapper.internalServerError();
        } else {
            return userMapper.emailSent();
        }
    });
}

function usr_Data_Display(userDataShow) {
    return userDao.user_Data_list(userDataShow)
}


function admin_Power_To_Change(userDataByAdminChange, adminTokenData) {
    return userDao.admin_Power(userDataByAdminChange, adminTokenData)
}

function admin_Can_Delete_any(Data, adminTokenData) {
    return userDao.admin_CAN_Delete(Data, adminTokenData)
}


//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isUserExist,
    send_mail,
    ResetPasswordLinkMailer,
    return_user_for_forgot_password,
    usr_Data_Display,
    admin_Power_To_Change,
    admin_Can_Delete_any,

};

//========================== Export Module End ===============================
