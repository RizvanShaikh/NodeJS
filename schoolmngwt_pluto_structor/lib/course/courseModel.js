const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available'
    },
    isActive: {
        type: Number,
    },
    purchasedId: {
        type: String
    },
    courseCreatedBy: mongoose.Schema.Types.ObjectId,

    buyers: [mongoose.Schema.Types.ObjectId],
    CreatedBy: String,
    token: String
});

module.exports = mongoose.model('courses', courseSchema)