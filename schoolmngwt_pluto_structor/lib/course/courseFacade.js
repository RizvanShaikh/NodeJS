
'use strict';


const courseService = require('./courseService');
const AppUtil = require('../appUtils');
const jwtHandler = require('../jwtHandler');
const courseMapper = require('./courseMapper');

function courseCheck(courseData, tokenOfUser) {
  return courseService.courseCheckExist(courseData, tokenOfUser)
    .then((result) => {
      return result;
    }).catch((err) => {
      return err;
    });
}

function courseDelete(courseID, tokenOfUser) {
  return courseService.checkIfTchr(courseID, tokenOfUser).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function coursDisplay(coursStatus) {
  return courseService.cours_Exist_Display(coursStatus).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function coursUpdate(courseData, tokenOfUser) {
  return courseService.cours_Upadate(courseData, tokenOfUser).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function course_display(courseData, tokenOfUser) {
  return courseService.cours_Exst_Dsply(courseData, tokenOfUser).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function Fave_course(tokenOfUser, courseId) {
  return courseService.make_Fav_Course(tokenOfUser, courseId).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function make_UnFave_course(tokenOfUser, courseId) {
  return courseService.make_UnFav_Course(tokenOfUser, courseId).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function stdn_buy_cours(courseId, adminToken) {
  return courseService.stdn_can_buy_course(courseId, adminToken).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}
//========================== Export Module Start ==============================

module.exports = {
  courseCheck,
  courseDelete,
  coursDisplay,
  coursUpdate,
  course_display,
  Fave_course,
  make_UnFave_course,
  stdn_buy_cours
};

//========================== Export Module End ===============================