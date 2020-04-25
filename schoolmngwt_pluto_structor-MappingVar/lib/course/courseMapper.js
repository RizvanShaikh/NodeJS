/**
 * This file will have request and response object mappings.
 *
 * Created by Rizwan
 */

 function courseExist(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
    }
    return respObj;
}

function onlyTeacherCreateCourse(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode":  responseCode ,
    }
    return respObj;
}

function courseDeleted(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
    }
    return respObj;
}

function courseAlreadyDeleted(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
    }
    return respObj;
}

function courseActive(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
    }
    return respObj;
}

function stntDeleteCrse(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
    }
    return respObj;
}

function stntCntUpdate(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
    }
    return respObj;
}

function coursUpdtSucess(responseCode, message) {
    var respObj = {
        "responseMessage": message,
        "responseCode": responseCode,
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
    courseExist,
    onlyTeacherCreateCourse,
    courseDeleted,
    courseAlreadyDeleted,
    stntDeleteCrse,
    stntCntUpdate,
    courseActive,
    coursUpdtSucess,
    studentCanBuyCourse
};
