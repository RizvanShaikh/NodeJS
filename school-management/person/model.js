const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    userType: {
        type: String,
        enum: ['student', 'teacher']
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
    userImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('person', userSchema)
