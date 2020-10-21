const mongoose = require('mongoose');

const { Schema } = mongoose;

const channelModel = new Schema({
    name: {
        type: String,
        required: [true, 'Channel name is required']
    },
    description: {
        type: String,
        required: [true, 'Channel description is required']
    },
    isVerified: {
        type: Boolean,
        default: 0
    },
    subscriber: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Channel', channelModel);