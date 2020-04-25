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
  .delete((req, res) => {
    let courseId = req.body;
    let tokenOfUser = req.headers.authorization;
    courseFacade.courseDelete(courseId, tokenOfUser).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    })

  });

// all list of courses which is available all active & inactive courses will be shown
courseRoutr.route('/CoursesList')
  .post((req, res) => {
    let coursStatus = req.body;
    courseFacade.coursList(coursStatus).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    })
  });
// all List of courses
courseRoutr.route('/allCourses') 
.get((req, res)=> {
  courseFacade.allCoursList().then((result) => {
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
    courseFacade.teacherCourses(courseData, tokenOfUser).then((result) => {
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
    courseFacade.faveCourse(tokenOfUser, courseId).then((result) => {
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
    courseFacade.makeUnFaveCourse(tokenOfUser, courseId).then((result) => {
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
    courseFacade.studentBuyCourse(coursId, adminToken).then((result) => {
      resHndlr.sendSuccess(res, result);
    }).catch((err) => {
      resHndlr.sendError(res, err);
    });
  });

module.exports = courseRoutr; 