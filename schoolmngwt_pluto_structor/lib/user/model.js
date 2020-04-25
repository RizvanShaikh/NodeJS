var mongoose = require('mongoose');
var constants = require('../constants');
var schema = mongoose.Schema;

var User;
var userSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    userType: {
        type: String,
        enum: ['admin', 'student', 'teacher']
    },
    student: {
        type: String,
    },
    teacher: {
        type: String,
        bonus: {
            type: Number,
            default: 100
        }
    },
    experience: {
        type: Number,
        required: false
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    phoneNumber: {
        type: Number

    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    token: String,
    referralCode: String,
    bonus: {
        type: Number,
        default: 0
    },
    favCourses: [mongoose.Schema.Types.ObjectId],
    refferncedBy: {
        type: String
    },
    referralCodeUsedBy: [mongoose.Schema.Types.ObjectId],
    welcome: String,
    message: String,
    userImage: [],
    resetPasswordToken: String,
    resetPasswordTimeout: String
    // excelSheet:[]
});

// userSchema.methods.toJSON = function () {
//     var obj = this.toObject();
//     // delete obj.isActive;
//     // delete obj.created;
//     // delete obj.updated;
//     return obj;
// };


userSchema.methods.userExist = function (name) {
    return this.where({ $or: [{ firstName: name }, { email: name }] });
};
//Export user module
User = module.exports = mongoose.model('person', userSchema)