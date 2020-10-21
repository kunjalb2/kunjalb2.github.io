const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoModel = new Schema({
    title: {
        type: String,
        required: [true, 'Video title is required']
    },
    description: {
        type: String,
        required: [true, 'Video description is required']
    },
    duration: {
        type: Number,
        required: [true, 'Video Duration is required']
    },
    url: {
        type: String,
        required: [true, 'Video URL is required']
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
    },
    comments: [
        { type: String }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoModel);