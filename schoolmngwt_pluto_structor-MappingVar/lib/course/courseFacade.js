
'use strict';

//importing a module
const courseService = require('./courseService');

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

function coursList(coursStatus) {
  return courseService.coursExistDisplay(coursStatus).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function allCoursList() {
  return courseService.allCoursExistDisplay().then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}
function coursUpdate(courseData, tokenOfUser) {
  return courseService.coursUpdate(courseData, tokenOfUser).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function teacherCourses(courseData, tokenOfUser) {
  return courseService.coursExstDsply(courseData, tokenOfUser).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function faveCourse(tokenOfUser, courseId) {
  return courseService.makeFavCourse(tokenOfUser, courseId).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function makeUnFaveCourse(tokenOfUser, courseId) {
  return courseService.makeUnFavCourse(tokenOfUser, courseId).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function studentBuyCourse(courseId, adminToken) {
  return courseService.studentCanBuyCourse(courseId, adminToken).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}
//========================== Export Module Start ==============================

module.exports = {
  courseCheck,
  courseDelete,
  coursList,
  allCoursList,
  coursUpdate,
  teacherCourses,
  faveCourse,
  makeUnFaveCourse,
  studentBuyCourse
};

//========================== Export Module End ===============================