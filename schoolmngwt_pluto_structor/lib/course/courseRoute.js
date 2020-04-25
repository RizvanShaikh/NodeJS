const courseRoutr = require('express').Router();

// importing module
const courseFacade = require('./courseFacade');
const resHndlr = require('../responseHandler');

// teacher can create a courses
courseRoutr.route('/createCourses')
  .post((req, res) => {
    let courseData = req.body;
    let tokenOfUser = req.headers.authorization;
    // jwtHandler.
    courseFacade.courseCheck(courseData, tokenOfUser).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    })
  });
// only owner of course (teacher) can delete courses
courseRoutr.route('/deleteCours')
  .post((req, res) => {
    let courseId = req.body;
    let tokenOfUser = req.headers.authorization;
    courseFacade.courseDelete(courseId, tokenOfUser).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    })

  });
// all list of courses which is available all active & inactive courses will be shown
courseRoutr.route('/listCourses')
  .get((req, res) => {
    let coursStatus = req.body;
    courseFacade.coursDisplay(coursStatus).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    })
  });
// teacher can see his(all)active inactive courses
courseRoutr.route('/teachersCourses')
  .get((req, res) => {
    courseData = req.body;
    let tokenOfUser = req.headers.authorization; // teacher's token
    courseFacade.course_display(courseData, tokenOfUser).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    })
  });
// only owner of course (teacher) can update courses
courseRoutr.route('/updateCours')
  .put((req, res) => {
    let courseData = req.body;// course Id
    let tokenOfUser = req.headers.authorization; // teacher's token
    courseFacade.coursUpdate(courseData, tokenOfUser).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendSuccess(res, err);
    })
  });
// make favourite courses
courseRoutr.route('/makeFavCourses')
  .post((req, res) => {
    let courseId = req.body
    let tokenOfUser = req.headers.authorization; // student's token
    courseFacade.Fave_course(tokenOfUser, courseId).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendSuccess(res, err);
    })
  });
// UnfavCourses 
courseRoutr.route('/makUnFavCourses')
  .post((req, res) => {
    let courseId = req.body
    let tokenOfUser = req.headers.authorization; // student's token
    courseFacade.make_UnFave_course(tokenOfUser, courseId).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendSuccess(res, err);
    })

  })
// student can buy courses
courseRoutr.route('/buyCourses')
  .post((req, res) => {
    coursId = req.body;
    adminToken = req.headers.authorization;
    courseFacade.stdn_buy_cours(coursId, adminToken).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    });
  });
module.exports = courseRoutr; 