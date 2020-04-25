const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    Status: {
        type: String,
        enum: ['Available', 'Unavailable']
    },
    purchasedId: {
        type: String
    },
    coursesCreatedBy: mongoose.Schema.Types.ObjectId,
    courseStatus: ['active', 'inactive'],
    buyers: [mongoose.Schema.Types.ObjectId],
    CreatedBy: String,
    token: String
});

module.exports = mongoose.model('courses', courseSchema)