'use strict';

//========================== Load internal modules ====================
//person schema
const courseModel = require('./courseModel');
const model = require('../user/model');// person schema 
const crsConstant = require('./courseConstants');
// course schema
// init user dao
let BaseDao = new require('../dao/baseDao');
const courseDao = new BaseDao(courseModel);
const cousrseMapper = require('./courseMapper');
//========================== Load Modules End ==============================================
// if user exist in data base
function courseIfExist(courseDetails) {

    let query = {
        $or: [
            { name: courseDetails.name },
            //  {firstName : courseDetails.firstName}
        ]
    }
    return courseDao.findOne(query);
}
async function findUserDataWithToken(courseObjInfo, tokenOfUserInfo) {

    let userData = await model.findOne({ token: tokenOfUserInfo });

    if (userData.userType == 'teacher') {
        var coursesCreatedById = userData._id;
        return saveCourse(courseObjInfo, coursesCreatedById)
    } else {
        return cousrseMapper.onlyTeacherCreateCourse();
    }
}
async function courseExistDelete(courseID, Token) {
    let teacherData = await model.findOne({ token: Token });
    if (teacherData == null) {
        return {
            success: 0,
            error: 1,
            message: 'User not found'
        }
    }
    if (teacherData.userType == 'teacher') {
        let coursData = await courseModel.findOne({ _id: courseID.course_id, courseCreatedBy: teacherData._id })
        if (coursData == null)
            return {
                success: 0,
                error: 1,
                message: 'Course not found'
            };
        /**** */
        if (coursData.isActive == 0) {
            let success = await courseModel.deleteOne({ _id: courseID.course_id, courseCreatedBy: teacherData._id })
            if (success.n) {

                return cousrseMapper.courseDeleted();

            } else {
                return cousrseMapper.courseAlreadyDeleted();
            }

        } else {
            return cousrseMapper.courseActive();
        }
        /**** */
    } else {
        return cousrseMapper.stntDeleteCrse();
    }
}

async function course_Update(courseData, tokenOfUser) {
    let teacherData = await model.findOne({ token: tokenOfUser });
    if (teacherData == null) {
        return {
            success: 0,
            error: 1,
            message: 'User not found'
        }
    }
    // set whatever we send in the request.body
    if (teacherData.userType == 'teacher') {

        let coursData = await courseModel.findOne({ _id: courseData.course_id, courseCreatedBy: teacherData._id })
        let buyerArray = coursData.buyers;

        if (buyerArray.length > 0) {
            return {
                success: 0,
                error: 1,
                message: "This course can't be Inactive because this course has been purchsed by someone!."
            }
        } else {
            let coursData = await courseModel.findOneAndUpdate({ _id: courseData.course_id, courseCreatedBy: teacherData._id },
                { $set: courseData });

            if (coursData) {
                return cousrseMapper.coursUpdtSucess();
            }
        }

    } else {
        return cousrseMapper.stntCntUpdate();
    }

}
async function course_Status(coursStatus) {
    try {
        let courseData = await courseModel.find({ status: coursStatus.status });
        if (courseData == null) {
            return {
                succes: 0,
                error: 1,
                message: "Courses doesn't found!."
            }
        }
        return {
            courseData
        }
    } catch (error) {
        return error;
    }
}
async function cours_Data_list(courseData, tokenOfUser) {
    try {
        let teacherData = await model.findOne({ token: tokenOfUser });

        if (teacherData == null) {
            return {
                success: 0,
                error: 1,
                message: 'User not found'
            }
        }
        let coursData = await courseModel.find({ courseCreatedBy: teacherData._id });
        return {
            coursData
        }
    } catch (error) {
        return error;
    }

}
async function make_Favourite_course(tokenOfUser, courseId) {
    try {
        let userData = await model.findOne({ token: tokenOfUser });
        if (userData == null) {
            return {
                success: 0,
                error: 1,
                message: 'User not found'
            }
        }
        if (userData.userType == 'student') {
            let favCourses = await model.updateOne(
                { _id: userData._id },
                { $addToSet: { favCourses: courseId.course_id } }
            );
            if (favCourses) {
                return {
                    success: 201,
                    message: "Course has been favourited successfully!"
                }
            }
        }
    } catch (error) {
        return error;
    }
}
async function make_UnFavourite_course(tokenOfUser, courseId) {
    try {
        let userData = await model.findOne({ token: tokenOfUser });
        if (userData == null) {
            return {
                success: 0,
                error: 1,
                message: 'User not found'
            }
        }

        if (userData.userType == 'student') {

            let unFavCourse = await model.updateOne(
                { _id: userData._id },
                { $pull: { favCourses: courseId.course_id } }
            );
            if (unFavCourse) {
                return {
                    success: 201,
                    message: "Course has been unfavourited successfully!"
                }
            }

        }

    } catch (error) {
        return error
    }
}
async function stdn_Can_Buy_course(courseID, studentToken) {
    try {
        let studentData = await model.findOne({ token: studentToken });

        if (studentData == null) {
            return {
                success: 0,
                error: 1,
                message: 'User not found'
            }
        }

        if (studentData.userType == 'student') {
            let courseBuy = await courseModel.updateOne({ _id: courseID.course_id },
                { $addToSet: { buyers: studentData._id } }
            );

            if (courseBuy) {
                return {
                    success: 201,
                    message: "Course purchased successfully!."
                }
            }

        } else {
            return userMapper.studentCanBuyCourse();
        }

    } catch (error) {
        return error
    }
}
// it will save courses
function saveCourse(courseObjInfoData, coursesCreatedByID) {
    let courseData = new courseModel(courseObjInfoData);
    courseData.courseCreatedBy = coursesCreatedByID;
    return courseDao.save(courseData);
}

//========================== Export Module Start ==============================
module.exports = {
    courseIfExist,
    findUserDataWithToken,
    saveCourse,
    courseExistDelete,
    course_Status,
    course_Update,
    cours_Data_list,
    make_Favourite_course,
    make_UnFavourite_course,
    stdn_Can_Buy_course
};
//========================== Export Module End ===============================
