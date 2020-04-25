'use strict';

const courseDao = require('./courseDao');
const cousrseMapper = require('./courseMapper');
const courseConstants = require('./courseConstants');
// create courses


function courseCheckExist(courseObj, tokenOfUserData) {
    return courseDao.courseIfExist(courseObj).then((exist) => {
        if (exist) {
            let message = courseConstants.MESSAGES.courseExist;
            let responseCode = courseConstants.STATUS_CODE.ERROR;
            return cousrseMapper.courseExist(responseCode, message);
        } else {
            return courseDao.findUserDataWithToken(courseObj, tokenOfUserData)
        }
    });
}

function checkIfTchr(courseID, tokenOfUser) {
    let message = courseConstants.MESSAGES.courseExist;
    let responseCode = courseConstants.STATUS_CODE.ERROR;
    return courseDao.courseExistDelete(courseID, tokenOfUser)
}

function coursExistDisplay(coursStatus) {
    return courseDao.courseStatus(coursStatus)
}

function allCoursExistDisplay() {
    return courseDao.allCourses()
}

function coursExstDsply(courseData, tokenOfUser) {
    return courseDao.coursDatalist(courseData, tokenOfUser)
}

function coursUpdate(courseData, tokenOfUser) {
    return courseDao.courseUpdate(courseData, tokenOfUser)
}

function makeFavCourse(tokenOfUser, courseId) {
    return courseDao.makeFavouritecourse(tokenOfUser, courseId)
}

function makeUnFavCourse(tokenOfUser, courseId) {
    return courseDao.makeUnFavouriteCourse(tokenOfUser, courseId)
}

function studentCanBuyCourse(courseId, adminToken) {
    return courseDao.studentCanBuyCourses(courseId, adminToken)
}
//========================== Export Module Start ==============================
module.exports = {

    courseCheckExist,
    checkIfTchr,
    coursExistDisplay,
    coursUpdate,
    coursExstDsply,
    allCoursExistDisplay,
    makeFavCourse,
    makeUnFavCourse,
    studentCanBuyCourse

};
//========================== Export Module End ===============================
