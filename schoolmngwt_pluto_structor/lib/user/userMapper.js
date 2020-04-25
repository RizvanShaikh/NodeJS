

const config = require('../config');

function registerMapping(params) {
    var respObj = {
        "responseMessage": "Successfully registered!.",
        "responseCode": 200,
        "userProfile": {
            id: params
        }
    };
    return respObj;
}
function userExist() {
    var respObj = {
        "responseMessage": "User already exist!.",
        "responseCode": 400,
    }
    return respObj;
}
function loginMapping(user, jwt) {
    var respObj = {
        "responseMessage": "Successfully Logged In!.",
        "responseCode": 200,
        "userProfile": {
            user: user,
            jwt: jwt
        }
    };

    return respObj;
}

function passwordMismatch() {
    var respObj = {
        "responseMessage": "Incorrect Password!.",
        "responseCode": 500
    }
    return respObj;
}
function userNotExist() {
    var respObj = {
        "responseMessage": "User Not Found!.",
        "responseCode": 404
    }
    return respObj;
}
function adminCanChange() {
    var respObj = {
        "responseMessage": "Only admin can perform changes!.",
        "responseCode": 404
    }
    return respObj;
}

function userDataupdated() {
    var respObj = {
        "responseMessage": "Changes has been performed successfully!.",
        "responseCode": 201
    }
    return respObj;
}

function errCntChange() {
    var respObj = {
        "responseMessage": "Oops! Can't be performed actions!.",
        "responseCode": 404
    }
    return respObj;
}

function courseDeleted() {
    var respObj = {
        "responseMessage": "Course deleted successfully!.",
        "responseCode": 201
    }
    return respObj;
}

function userDeleted() {
    var respObj = {
        "responseMessage": "User deleted successfully!.",
        "responseCode": 201
    }
    return respObj;
}

function courseAlreadyDeleted() {
    var respObj = {
        "responseMessage": "Course has already been deleted!.",
        "responseCode": 201
    }
    return respObj;
}

function studentCanBuyCourse() {
    var respObj = {
        "responseMessage": "Only student can buy courses!.",
        "responseCode": 201
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