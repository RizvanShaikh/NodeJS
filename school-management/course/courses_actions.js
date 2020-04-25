//importing a module
const courseModel = require('./courseModel'); // courseshema
const model = require('../person/model');// schema

module.exports = {

    createCourses: async function (req, res) {

        var Model = new courseModel(req.body);

        model.findOne({ token: req.headers.authorization }, (err, data) => {
            if (err) {
                return res.json({
                    code: 404,
                    message: err.message
                })
            } else {
                if (data.userType == 'teacher') {
                    
                    Model.coursesCreatedBy = data._id;
                    Model.save((err, coursesIs) => {
                        if (err) {
                            return res.json({
                                code: 404,
                                message: "Only teacher can create courses!"
                            })
                        } else {
                            res.status(200);
                            return res.send(coursesIs);
                        }
                    })
                } else {
                    return res.json({
                        code: 404,
                        message: "Only teacher can create courses!"
                    })
                }

            }

        })
    },
 // only teacher can delete his own courses
    deleteCourse: async function (req, res) {
        if (req.headers.authorization == null) {
            return res.json({
                code: 404,
                message: "Please apply the token!"
            })
        } else {
            model.findOne({ token: req.headers.authorization }, (err, teacherData) => {
                const result = {};
                console.log(teacherData, "63")
                if (err) {
                    result.status = 400;
                    result.message = err.message;
                    return res.json(result);
                } else {
                    if (teacherData.userType == 'teacher') {

                        courseModel.findOne({ _id: req.body.course_id, coursesCreatedBy: teacherData._id }, (err, coursData) => {
                            if (err) {
                                result.status = 400;
                                result.message = err.message;
                                return res.json(result);
                            } else {
                                if (coursData == null) {
                                    result.status = 400;
                                    result.message = "Only Owner of course can delete this course";
                                    return res.json(result);
                                } else {
                                    if (coursData.courseStatus == 'inactive') {
                                        courseModel.deleteOne({ _id: req.body.course_id, coursesCreatedBy: teacherData._id }, (err, success) => {
                                            if (err) {
                                                result.status = 400;
                                                result.message = "Only Owner of course can delete this course";
                                                return res.json(result);
                                            }
                                            if (success.n) {
                                                result.status = 200;
                                                result.message = 'Course deleted successfully.';
                                                return res.json(result);
                                            } else {
                                                result.status = 400;
                                                result.message = 'No such course found! ';
                                                return res.json(result);
                                            }
                                        })
                                    } else {
                                        return res.json({
                                            code: 404,
                                            message: "You can't delete course because this is active course!"
                                        })
                                    }
                                }

                            }

                        })
                    } else {
                        return res.json({
                            code: 404,
                            message: "You are not a teacher, so you can't delete course!"
                        })
                    }
                }
            })
        }

    },
    listCourses: async function (req, res) {
        courseModel.find({ Status: req.body.Status }, (err, courses) => {
            if (err) {
                return res.json({
                    code: 404,
                    message: "Error in fetching the data !"
                })
            } else {
                if (req.body.Status === "Available") {
                    return res.json({
                        courses
                    })
                } else if (req.body.Status === "Unavailable") {
                    return res.json({
                        courses
                    })
                } else {
                    return res.json({
                        code: 404,
                        message: "Courses are Unavailable!"
                    })
                }
            }
        })
    },
    makeFavCourses: async function (req, res) {
        if (req.headers.authorization == null) {
            return res.json({
                code: 404,
                message: "Please apply the token!"
            })
        } else {
            model.findOne({ token: req.headers.authorization }, (err, userData) => {
                if (err) {
                    result.status = 400;
                    result.message = err.message;
                    return res.json(result);
                }
                console.log(userData, "200")
                if (userData.userType == 'student') {
                    const result = {};
                    favCourses(userData._id, req.body.course_id, (err, data) => {
                        if (err) {
                            result.status = 400;
                            result.message = err.message;
                            result.data = {};
                            return res.json(result);
                        }
                        /* in schema we take Array of favourite and we will push
                           courses is into an array of favCourses
                        */
                        model.update(
                            { _id: userData._id },
                            { $addToSet: { favCourses: req.body.course_id } }
                        ).then(docs => {
                            result.status = "201";
                            result.message = "Course add to favourite successfully!";
                            res.status(201).send(result);
                        })
                            .catch(e => {
                                result.status = 400;
                                result.message = e;
                                result.data = {};
                                return res.json(result);
                            })
                     })
                } else {
                    return res.json({
                        code: 404,
                        message: "only students can make favourite courses!"
                    })
                }
            })
        }
    },
    makUnFavCourses: async function (req, res) {
        if (req.headers.authorization == null) {
            return res.json({
                code: 404,
                message: "Please apply the token!"
            })
        } else {
            model.findOne({ token: req.headers.authorization }, (err, userData) => {
                if (userData.userType == 'student') {
                    const result = {};
                    try {
                        model.update({ _id: userData._id },
                            { $pull: { favCourses: req.body.course_id } }
                        ).then((d) => {
                            console.log(d, "hello");
                            result.status = "201";
                            result.message = "Course has been Unfavourited successfully!";
                            res.status(201).send(result);
                        })
                    } catch (e) {
                        result.status = 400;
                        result.message = e;
                        return res.json(result);
                    }

                } else {
                    return res.json({
                        code: 404,
                        message: "only students can Unfavourite courses!"
                    })
                }
            })
        }
    },
    buyCourses: async function (req, res) {
        if (req.headers.authorization == null) {
            return res.json({
                code: 404,
                message: "Please apply the token!"
            })
        } else {
            model.findOne({ token: req.headers.authorization }, (err, buyer) => {
                if (buyer.userType == 'student') {
                    const result = {};
                    isIdPresent(buyer._id, req.body.course_id, (err, data) => {
                        if (err) {
                            result.status = 400;
                            result.message = err.message;
                            result.data = {};
                            return res.json(result);
                        }
                        /* in schema we take Array of buyers and we will push
                           buyers is into an array 
                        */
                        courseModel.update(
                            { _id: req.body.course_id },
                            { $addToSet: { buyers: buyer._id } }
                        ).then(docs => {
                            result.status = "201";
                            result.message = "Course purchsed successfully!";
                            res.status(201).send(result);
                        })
                            .catch(e => {
                                result.status = 400;
                                result.message = e;
                                result.data = {};
                                return res.json(result);
                            })
                    })

                } else {
                    return res.json({
                        code: 404,
                        message: "You don't have enough coin to buy the courses!"
                    })
                }
            })
        }
    }

}
// for buyer who buy the courses 
async function isIdPresent(buyer_id, course_id, cb) {
   courseModel.findOne({ _id: course_id }, (err, coursData) => {
        if (err || !coursData)
            return cb(new Error('No such course available'), null);
        coursData.buyers.includes(buyer_id) ?
            cb(new Error('You have already buyied this course'), null) :
            cb(null, coursData);
    })
}
// for favourite courses 
async function favCourses(user_id, course_id, cb) {
    model.findOne({ _id: user_id }, (err, favCoursData) => {
        console.log(favCoursData)
        favCoursData.favCourses.includes(course_id) ?
            cb(new Error("you have already favourites this courses")) :
            cb(null, favCoursData);
    })
}
