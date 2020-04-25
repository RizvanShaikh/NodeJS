'use strict';
//========================== Load internal modules ====================
//person schema
const User = require('./model');
const model = require('../user/model');
const nodemailer = require('nodemailer');
//importing a module
const courseModel = require('../course/courseModel');
const userMapper = require('./userMapper');
const courseConstants = require('../course/courseConstants')
const userConstants = require('./userConstants');
// init user dao
let BaseDao = new require('../dao/baseDao');
const userDao = new BaseDao(User);
//========================== Load Modules End ==============================================
// if user exist in data base
function checkIfExist(usrDetails) {
    let query = {
        $or: [
            { email: usrDetails.email },
            { firstName: usrDetails.firstName }
        ]
    }
    return  userDao.findOne(query);
}
// if user data not exist in data base then save it
function registerUser(reqbodyUserData, referralCodeBody, imageInArray) {
    try {
        var [imageInArray, imageArrayForMail] = imageData(imageInArray);
        var bonusStudent = 25;
        var bonusTeacher;
        var Model = new model(reqbodyUserData);

        Model.save(async (err, newUser) => {
            if (err) {
                return {
                    code: 404,
                    message: err.message
                }
            } else {
                newUser.referralCode = generateReferralCode();
                if (reqbodyUserData.referralCode != null) {
                    model.findOne({ referralCode: referralCodeBody }, (err, reffry) => {
                        if (err) {
                            return {
                                code: 404,
                                message: err.message
                            }
                        } else {
                            if (reffry) {
                                // if student reffered by teacher        
                                if (reffry.userType == 'teacher' && newUser.userType == 'student') {

                                    reffry.bonus += 50; // 50 + 50
                                    newUser.bonus = bonusStudent + 25; //25

                                }
                                // if teacher reffered by teacher   
                                else if (reffry.userType == 'student' && newUser.userType == 'teacher') {

                                    reffry.bonus += 25;
                                    newUser.bonus = bonusStudent + 25; //25

                                } else if (reffry.userType == 'teacher' && newUser.userType == 'teacher') {

                                    reffry.bonus += 50;
                                    newUser.bonus = bonusStudent + 50;

                                } else if (reffry.userType == 'student' && newUser.userType == 'student') {

                                    reffry.bonus += 25;
                                    newUser.bonus = bonusTeacher + 25;

                                }
                                /********* mail ********/
                                function eMail(newUser, reffry) {
                                    var mailResult = "Hi!" + " " + `${reffry.firstName}` + " " + "your referral code is used by" + " " + `${newUser.firstName}` + " " + `${newUser.lastName}.`;
                                    return mailResult;
                                }
                                var eMailResult = eMail(newUser, reffry)
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: newUser.email,
                                        pass: 'rizwan1994'
                                    },
                                    tls: {
                                        rejectUnauthorized: false
                                    }
                                });
                                var mailOptions = {
                                    from: newUser.email,
                                    to: reffry.email,

                                    subject: 'Sending Email using  Node.js',
                                    text: "Congratulations!" + " " + eMailResult + `Your current balance point is ${reffry.bonus}. Thank You!`,

                                    attachments: imageArrayForMail
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        return error
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                                /********************/
                                reffry.save();
                                newUser.refferncedBy = reffry._id;
                                model.updateOne(
                                    { _id: reffry._id },
                                    { $addToSet: { referralCodeUsedBy: newUser._id } }
                                )
                                newUser.welcome = `Welcome ${newUser.firstName} to School Management System!`;
                                // to save image in array
                                newUser.userImage = imageInArray;
                                let user = new User(newUser);
                                return userDao.save(user);
                            }
                        }
                    })
                } else {
                    // if referral code is doesn't apply
                    newUser.bonus = 25;
                    newUser.welcome = `Welcome ${newUser.firstName} to School Management System!`;
                    // to save image in array
                    newUser.userImage = imageInArray;
                    let user = new User(newUser);
                    return userDao.save(user);
                }
            }
        })
    } catch (error) {
        return error;
    }
}
//to genererat random refferal code 
function generateReferralCode(length = 10) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
// for the images file send
function imageData(imageArrayData) {
    var imageArrayForDataBase = []
    var imageArrayForMail = []
    for (let i = 0; i < imageArrayData.length; i++) {
        // console.log('i',i);
        imageArrayForDataBase.push(imageArrayData[i].path);
        imageArrayForMail.push({ filename: imageArrayData[i].originalname, path: imageArrayData[i].path });
    }
    return [imageArrayForDataBase,
        imageArrayForMail
    ];
}
async function userDataList(userDatareq) {
    try {
        let userData = await model.find({ userType: userDatareq.userType });
        if (userData == null) {
            return {
                code: 404,
                message: userConstants.MESSAGES.userNotFound
            }
        }
        return {
            userData
        }
    } catch (error) {
        return error;
    }
}

async function allUserDataList() {
    try {
        let userData = await model.find({ });
        if (userData == null) {
            return {
                code: 404,
                message: userConstants.MESSAGES.userNotFound
            }
        }
        return {
            userData
        }
    } catch (error) {
        return error;
    }
}
// admin can make changes to Courses, User Profile, delete User, courses
async function adminAuthority(userDtaByAdmnChge, adminTokenData) {
    let adminData = await model.findOne({ token: adminTokenData });
    if (adminData == null) {
        return {
            code: 404,
            message: userConstants.MESSAGES.userNotFound 
        }
    }
    if (adminData.userType == 'admin') {
        // for the  user data
        let userData = await model.findOneAndUpdate({ firstName: userDtaByAdmnChge.firstName },
            { $set: userDtaByAdmnChge });
        // for the course data
        let courseData = await courseModel.findOneAndUpdate({ _id: userDtaByAdmnChge.course_id },
            { $set: userDtaByAdmnChge });

        if (userData || courseData) {
            let changesMade = userConstants.MESSAGES.changesMade;
            let responseCode = userConstants.STATUS_CODE.succes;
            return userMapper.userDataupdated(changesMade,responseCode);
        } else {
            let cantPerformAction = userConstants.MESSAGES.cantPerformAction;
            let responseCode = userConstants.STATUS_CODE.ERROR;
            return userMapper.errCntChange( responseCode,cantPerformAction);
        }
    } else {
        let adminCanChange = userConstants.MESSAGES.adminCanChange;
        let responseCode = userConstants.STATUS_CODE.ERROR;
        return userMapper.adminCanChange( adminCanChange, responseCode);
    }
}
async function adminAuthorityToDelete(DataToDelete, adminTokenData) {
    let adminData = await model.findOne({ token: adminTokenData });
    if (adminData == null) {
        return {
            code: 404,
            message: userConstants.MESSAGES.userNotFound 
        }
    }
    if (adminData.userType == 'admin') {
        // admin can delete courses
        let success = await courseModel.deleteOne({ _id: DataToDelete.course_id });
        // admin can delete users
        let successUser = await model.deleteOne({ _id: DataToDelete.user_id });

        if (success.n) {
            let courseDeleted = userConstants.MESSAGES.courseDeleted;
            let responseCode = userConstants.STATUS_CODE.succes;
            return userMapper.courseDeleted(courseDeleted,responseCode );
        } else if (successUser.n) {
            let userDeleted = userConstants.MESSAGES.userDeleted;
            let responseCode = userConstants.STATUS_CODE.succes;
            return userMapper.userDeleted(userDeleted, responseCode);
        }
        else {
            let courseAlreadydeleted = userConstants.MESSAGES.courseAlreadydeleted;
            let responseCode = userConstants.STATUS_CODE.succes;
            return userMapper.courseAlreadyDeleted(courseAlreadydeleted, responseCode);
        }
    } else {
        let adminCanChange = userConstants.MESSAGES.adminCanChange;
        let responseCode = userConstants.STATUS_CODE.ERROR;
        return userMapper.adminCanChange( adminCanChange, responseCode);
        
    }
}
//========================== Export Module Start ==============================
module.exports = {
    registerUser,
    checkIfExist,
    userDataList,
    adminAuthority,
    allUserDataList,
    adminAuthorityToDelete
};
//========================== Export Module End ===============================
