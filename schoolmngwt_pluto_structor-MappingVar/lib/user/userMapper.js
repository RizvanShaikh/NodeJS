/**
 * This file will have request and response object mappings.
 *
 * Created by Rizwan
 */

function registerMapping(params, responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
        "userProfile": {
            id: params
        }
    };
    return respObj;
}

function userExist( responseCode, message) {
    var respObj = {
        "responseMessage":  message,
        "responseCode":  responseCode,
    }
    return respObj;
}

function loginMapping(user, jwt,  responseCode, message) {
    var respObj = {
        "responseMessage":  message,
        "responseCode": responseCode,
        "userProfile": {
            user: user,
            jwt: jwt
        }
    };
    return respObj;
}

function passwordMismatch(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function userNotExist(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function adminCanChange(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function userDataupdated(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function errCntChange(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function courseDeleted(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function userDeleted(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function courseAlreadyDeleted(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

function studentCanBuyCourse(  responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode
    }
    return respObj;
}

module.exports = {
    registerMapping,
    userExist,
    loginMapping,
    passwordMismatch,
    userNotExist,
    adminCanChange,
    userDataupdated,
    errCntChange,
    courseDeleted,
    courseAlreadyDeleted,
    userDeleted,
    studentCanBuyCourse
};