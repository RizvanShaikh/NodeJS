//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");
var userConst = require('./userConstants');
var exceptions = require('../customExceptions');
var appUtils = require('../appUtils');

// validation for new password and re-entered password
var checkResetPassword = function (req, res, next) {

    let { new_password, reagain_password } = req.query;
    let error = [];

    if (!new_password) {
        error.push({ code: 500, message: userConst.MESSAGES.reset_new_password });
    } else if (new_password.length < 6) {
        error.push({ code: 500, message: userConst.MESSAGES.PASWORD_LENGTH });
    }
    if (!reagain_password) {
        error.push({ code: 500, message: userConst.MESSAGES.reset_reagain_password });
    } else if (reagain_password.length < 6) {
        error.push({ code: 500, message: userConst.MESSAGES.PASWORD_LENGTH });
    }
    if (new_password && reagain_password && !(new_password == reagain_password)) {
        error.push({ code: 500, message: userConst.MESSAGES.reset_password_mismatch });
    }

    if (error.length > 0) {
        res.json(validationError(error, next));
    }
    next();
}
var requiredCheck = function (req, res, next) {

    let { email, password, firstName } = req.body;

    let error = [];
    if (!email) {
        error.push({ code: 500, message: userConst.MESSAGES.EmailCantEmpty });
    }
    if (!firstName) {
        error.push({ code: 500, message: userConst.MESSAGES.FIRST_NAMEEMPTY });
    }
    if (!password) {
        error.push({ code: 500, message: userConst.MESSAGES.PWD_CANT_EMPTY });
    }
    else if (password.length < 6) {
        error.push({ code: 500, message: userConst.MESSAGES.PASWORD_LENGTH });
    }
    if (error.length > 0) {
        validationError(error, next);
    }
    next();
}


var validateLogin = function (req, res, next) {

    var { email, password } = req.body;
    var errors = [];
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "password", message: userConst.MESSAGES.PWD_CANT_EMPTY });
    }
    email = req.body.email

    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: userConst.MESSAGES.EmailCantEmpty });
    } else {
        if (!appUtils.isValidEmail(email)) {
            errors.push({ fieldName: "email", message: userConst.MESSAGES.InvalidEmail });
        }
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return exceptions.getCustomErrorException('Invalid data', errors);
    }
    next();
};

module.exports = {

    requiredCheck,
    validateLogin,
    checkResetPassword

};