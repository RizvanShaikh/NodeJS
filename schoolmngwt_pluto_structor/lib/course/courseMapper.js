


function courseExist() {
    var respObj = {
        "responseMessage": "Course already exist.",
        "responseCode": 400,
    }
    return respObj;
}

function onlyTeacherCreateCourse() {
    var respObj = {
        "responseMessage": "Only teacher can create courses!.",
        "responseCode": 400,
    }
    return respObj;
}

function courseDeleted() {
    var respObj = {
        "responseMessage": "Course deleted successfully!.",
        "responseCode": 200,
    }
    return respObj;
}

function courseAlreadyDeleted() {
    var respObj = {
        "responseMessage": "Course already deleted successfully!.",
        "responseCode": 400,
    }
    return respObj;
}

function courseActive() {
    var respObj = {
        "responseMessage": "Active course can't be deleted!.",
        "responseCode": 400,
    }
    return respObj;
}

function stntDeleteCrse() {
    var respObj = {
        "responseMessage": "Student can't delete courses!.",
        "responseCode": 400,
    }
    return respObj;
}

function stntCntUpdate() {
    var respObj = {
        "responseMessage": "Student can't update courses!.",
        "responseCode": 400,
    }
    return respObj;
}

function coursUpdtSucess() {
    var respObj = {
        "responseMessage": "Course updated succesfully!.",
        "responseCode": 201,
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
    coursUpdtSucess
};
