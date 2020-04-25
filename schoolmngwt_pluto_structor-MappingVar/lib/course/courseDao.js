'use strict';

//========================== Load internal modules ====================
//person schema
const courseModel = require('./courseModel');
const model = require('../user/model');// person schema 
const courseConstant = require('./courseConstants');
const cousrseMapper = require('./courseMapper');
// const = require('./courseConstants');
// init user dao
let BaseDao = new require('../dao/baseDao');
const courseDao = new BaseDao(courseModel);

//========================== Load Modules End ==============================================
// if user exist in data base
function courseIfExist(courseDetails) {
    let query = {
        $or: [
            { name: courseDetails.name },
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
        let onlyTeacherCreate = courseConstant.MESSAGES.onlyTeacherCreate;
        let responseCode = courseConstant.STATUS_CODE.SUCCESS;
        return cousrseMapper.onlyTeacherCreateCourse(responseCode,onlyTeacherCreate);
    }
}
async function courseExistDelete(courseID, Token) {
   
    let teacherData = await model.findOne({ token: Token });
    if (teacherData == null) {
        return {
            code: 404,
            message: courseConstant.MESSAGES.userNotFound
        }
    }
    if (teacherData.userType == 'teacher') {
        let coursData = await courseModel.findOne({ _id: courseID.course_id, courseCreatedBy: teacherData._id })
        if (coursData == null)
            return {
                code: 404,
                message: courseConstant.MESSAGES.coursNotFound
            };
        if (coursData.isActive == 0) {
            let success = await courseModel.deleteOne({ _id: courseID.course_id, courseCreatedBy: teacherData._id })
            if (success.n) {
                let courseDeleted = courseConstant.MESSAGES.courseDeleted;
                let responseCode = courseConstant.STATUS_CODE.SUCCESS;
                return cousrseMapper.courseDeleted(responseCode, courseDeleted);
            } else {
                let courseAlreadyDeleted = courseConstant.MESSAGES.courseAlreadyDeleted;
                let responseCode = courseConstant.STATUS_CODE.ERROR;
                return cousrseMapper.courseAlreadyDeleted(responseCode, courseAlreadyDeleted);
            }
        } else {
            let activeCourse = courseConstant.MESSAGES.activeCourse;
            let responseCode = courseConstant.STATUS_CODE.ERROR;
            return cousrseMapper.courseActive(activeCourse, responseCode);
        }
    } else {
        let studentCantDelete = courseConstant.MESSAGES.studentCantDelete;
        let responseCode = courseConstant.STATUS_CODE.ERROR;
        return cousrseMapper.stntDeleteCrse(responseCode,studentCantDelete);
    }
}
async function courseUpdate(courseData, tokenOfUser) {
    let teacherData = await model.findOne({ token: tokenOfUser });
    if (teacherData == null) {
        return {
            code: 404,
            message: courseConstant.MESSAGES.userNotFound
        }
    }
    // set whatever we send in the request.body
    if (teacherData.userType == 'teacher') {

        let coursData = await courseModel.findOne({ _id: courseData.course_id, courseCreatedBy: teacherData._id })
        let buyerArray = coursData.buyers;

        if (buyerArray.length > 0) {
            return {
                code: 404,
                message: courseConstant.MESSAGES.purchsedCourse
            }
        } else {
            let coursData = await courseModel.findOneAndUpdate({ _id: courseData.course_id, courseCreatedBy: teacherData._id },
                { $set: courseData });
            if (coursData) {
                let updatedCourse = courseConstant.MESSAGES.updatedCourse;
                let responseCode = courseConstant.STATUS_CODE.Success;
                return cousrseMapper.coursUpdtSucess(responseCode ,updatedCourse);
            }
        }
    } else {
        let studentCantUpdateCourse = courseConstant.MESSAGES.studentCantUpdateCourse;
        let responseCode = courseConstant.STATUS_CODE.ERROR;
        return cousrseMapper.stntCntUpdate(responseCode ,studentCantUpdateCourse);
    }
}
async function courseStatus(coursStatus) {
    try {
        let courseData = await courseModel.find({ status: coursStatus.status });
        if (courseData == null) {
            return {
                code: 404,
                message: courseConstant.MESSAGES.coursNotFound
            }
        }
        return { courseData }
    } catch (error) {
        return error;
    }
}
async function allCourses() {
    try {
        let courseData = await courseModel.find({});
        if (courseData == null) {
            return {
                code: 404,
                message: courseConstant.MESSAGES.coursNotFound
            }
        }
        return { courseData }
    } catch (error) {
        return error;
    }
}
async function coursDatalist(courseData, tokenOfUser) {
    try {
        let teacherData = await model.findOne({ token: tokenOfUser });
        console.log(teacherData, "teacher data from 138")
        if (teacherData == null) {
            return {
                code: 404,
                message: courseConstant.MESSAGES.userNotFound
            }
        }
        let courseData = await courseModel.find({ courseCreatedBy: teacherData._id });
        return { courseData }
    } catch (error) {
        return error;
    }
}
async function makeFavouritecourse(tokenOfUser, courseId) {
    try {
        let userData = await model.findOne({ token: tokenOfUser });
        if (userData == null) {
            return {
                code: 404,
                message: courseConstant.MESSAGES.userNotFound
            }
        }
        if (userData.userType == 'student') {
            let favCourses = await model.updateOne(
                { _id: userData._id },
                { $addToSet: { favCourses: courseId.course_id } }
            );
            if (favCourses) {
                return {
                    code: 201,
                    message: courseConstant.MESSAGES.FavCourseAdded
                }
            }
        }
    } catch (error) {
        return error;
    }
}
async function makeUnFavouriteCourse(tokenOfUser, courseId) {
    try {
        let userData = await model.findOne({ token: tokenOfUser });
        if (userData == null) {
            return {
                code: 404,
                message: courseConstant.MESSAGES.userNotFound
            }
        }
        if (userData.userType == 'student') {
        let unFavCourse = await model.updateOne(
                { _id: userData._id },
                { $pull: { favCourses: courseId.course_id } }
            );
            if (unFavCourse) {
                return {
                    code: 201,
                    message: courseConstant.MESSAGES.UnFavCourse
                }
            }
       }
    } catch (error) {
        return error;
    }
}
async function studentCanBuyCourses(courseID, studentToken) {
    try {
        let studentData = await model.findOne({ token: studentToken });
        if (studentData == null) {
            return {
                code: 404,
                message: courseConstant.MESSAGES.userNotFound
            }
        }
    if (studentData.userType == 'student') {
            let courseBuy = await courseModel.updateOne({ _id: courseID.course_id },
                { $addToSet: { buyers: studentData._id } }
            );
         if (courseBuy) {
                return {
                    code: 201,
                    message: courseConstant.MESSAGES.purchasedCours
                }
            }
        } else {
            let onlyStudentBuyCours = courseConstant.MESSAGES.onlyStudentBuyCours;
            let responseCode = courseConstant.STATUS_CODE.ERROR;
            return cousrseMapper.studentCanBuyCourse(onlyStudentBuyCours, responseCode);
        }
    } catch (error) {
        return error;
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
    courseStatus,
    allCourses,
    courseUpdate,
    coursDatalist,
    makeFavouritecourse,
    makeUnFavouriteCourse,
    studentCanBuyCourses
};
//========================== Export Module End ===============================
