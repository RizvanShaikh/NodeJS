const courseRoutr = require('express').Router();

// importing module
const courseFacade = require('./courseFacade');
const resHndlr = require('../responseHandler');

// teacher can create a courses
// courseRoutr.route('/createCourses')
//   .post((req, res) => {
//     let courseData = req.body;
//     let tokenOfUser = req.headers.authorization;
//     // jwtHandler.
//     courseFacade.courseCheck(courseData, tokenOfUser).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     })
//   });

module.exports = courseRoutr; 