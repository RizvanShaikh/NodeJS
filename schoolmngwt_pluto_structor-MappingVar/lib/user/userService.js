'use strict';

const userDao = require('./userDao');
const userMapper = require('./userMapper');
const AppUtil = require('../appUtils');
const nodemailer = require('nodemailer');
const userConstants = require('./userConstants');

// for creating user 
function signupUser(usrDetails, referralCode, imageInArray) {
    return userDao.checkIfExist(usrDetails).then((userExist) => {
        if (userExist) {
            let userExist = userConstants.MESSAGES.userExist;
            let responseCode = userConstants.STATUS_CODE.ERROR;
            return userMapper.userExist(userExist, responseCode);
        } else {
            var userData = userDao.registerUser(usrDetails, referralCode, imageInArray)
            let registerMapping = userConstants.MESSAGES.Registered;
            let responseCode = userConstants.STATUS_CODE.SUCCESS;
            return userMapper.registerMapping(userData, registerMapping, responseCode);
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

// user for forgot password
function userforForgotPassword(body) {
    return userDao.checkIfExist(body)
        .then((userExist) => {
            if (userExist) return userExist;
            else return null;
        })
        .catch(err => {
            return err;
        })
}
//====== for ResetPassword Link it will send email =========
function resetPasswordLinkMailer(email, link) {
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
        to:  email, // receivers mail id 

        subject: 'Reset Password Link', // Subject line
        text: 'Please use below link to set new Password.', // plain text body
        html: `<b>Link: </b><a href='${link}'>Reset</a> \n Url: ${link}`// html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        } else {
            return userMapper.emailSend();
        }
    });
}

function usrDataDisplay(userDataShow) {
    return userDao.userDataList(userDataShow)
}

function allUsrDataDisplay() {
    return userDao.allUserDataList()
}
function adminAuthorityToEdit(userDataByAdminChange, adminTokenData) {
    return userDao.adminAuthority(userDataByAdminChange, adminTokenData)
}

function adminAuthorityDelete(Data, adminTokenData) {
    return userDao.adminAuthorityToDelete(Data, adminTokenData)
}


//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isUserExist,
    resetPasswordLinkMailer,
    userforForgotPassword,
    usrDataDisplay,
    allUsrDataDisplay,
    adminAuthorityToEdit,
    adminAuthorityDelete,
};

//========================== Export Module End ===============================
