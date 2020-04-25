'use strict';

const courseDao = require('./courseDao');
const cousrseMapper = require('./courseMapper');
// create courses
function courseCheckExist(courseObj, tokenOfUserData) {
    return courseDao.courseIfExist(courseObj).then((exist) => {
        if (exist) {
            return cousrseMapper.courseExist();
        } else {
            return courseDao.findUserDataWithToken(courseObj, tokenOfUserData)
        }
    });
}
function checkIfTchr(courseID, tokenOfUser) {
    return courseDao.courseExistDelete(courseID, tokenOfUser)
}

function cours_Exist_Display(coursStatus) {
    return courseDao.course_Status(coursStatus)
}

function cours_Exst_Dsply(courseData, tokenOfUser) {
    return courseDao.cours_Data_list(courseData, tokenOfUser)
}
function cours_Upadate(courseData, tokenOfUser) {

    return courseDao.course_Update(courseData, tokenOfUser)
}

function make_Fav_Course(tokenOfUser, courseId) {

    return courseDao.make_Favourite_course(tokenOfUser, courseId)
}

function make_UnFav_Course(tokenOfUser, courseId) {

    return courseDao.make_UnFavourite_course(tokenOfUser, courseId)
}
function stdn_can_buy_course(courseId, adminToken) {
    return courseDao.stdn_Can_Buy_course(courseId, adminToken)
}
//========================== Export Module Start ==============================
module.exports = {

    courseCheckExist,
    checkIfTchr,
    cours_Exist_Display,
    cours_Upadate,
    cours_Exst_Dsply,
    make_Fav_Course,
    make_UnFav_Course,
    stdn_can_buy_course

};
//========================== Export Module End ===============================
