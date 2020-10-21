const { validationResult } = require("express-validator");
var ObjectId = require('mongoose').Types.ObjectId;
const { Channel, User, Video } = require('../models');

const authorController = {
    async getAllChannels(req, res) {

        const totalChannels = await Channel.countDocuments({}, function (err, count) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                });
            }

            if (count === 0) {
                return res.status(404).json({
                    success: true,
                    message: 'No channels found'
                });
            }
        });

        const allChannels = await Channel.find().populate('owner', '-_id username email');

        var responseData = {
            success: true,
            channel_count: totalChannels,
            channels: allChannels.map(channel => {
                return {
                    channel_id: channel._id,
                    name: channel.name,
                    description: channel.description,
                    isVerified: channel.isVerified,
                    subscriber: channel.subscriber,
                    owner: channel.owner
                };
            })
        };

        res.status(200).json(responseData);
    },
    async updateChannel(req, res) {
        const channel_id = req.params.id;
        const channel = await Channel.findById(channel_id, '-__v', function (error, channel) {
            if (error) {
                return res.status(404).json({
                    success: true,
                    message: 'Invalid channel'
                });
            }
        });

        const updatedChannel = await Channel.findByIdAndUpdate(channel_id, req.body, { new: true }, function (error, updatedChannel) {
            if (error) {
                return res.status(404).json({
                    success: true,
                    message: 'Channel update failed'
                });
            }
        }).populate('owner', '-_id username email');

        return res.status(200).json({
            success: true,
            message: 'Channel Updated successfully',
            channel: {
                name: updatedChannel.name,
                description: updatedChannel.description,
                subscriber: updatedChannel.subscriber,
                isVerified: updatedChannel.isVerified,
                owner: updatedChannel.owner
            }
        });

    },

    async getAllVideos(req, res) {

        const channel = await Channel.findById(req.params.id, '-__v', function (error, channel) {
            if (error) {
                return res.status(404).json({
                    success: true,
                    message: 'Invalid channel'
                });
            }
        }).populate('owner', '-_id username email');

        return res.status(200).json({
            success: true,
            channel: channel
        });
    },
    async saveChannel(req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const userChannel = await Channel.findOne({ owner: new ObjectId(req.user.id) }, function (error, userChannel) {
            if (error) {
                return res.status(400).json({
                    succcess: false,
                    message: 'Channel not exists'
                })
            }
        });

        if (userChannel) {
            return res.status(400).json({
                succcess: false,
                message: 'Channel already create for this user'
            })
        }

        const newChannel = new Channel(req.body);
        if (req.user.id) {

            channelOwnerUser = await User.findById(req.user.id, 'username email', function (error, channelOwnerUser) {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: 'Invalid user specified'
                    });
                }
            });

            newChannel.owner = req.user.id;
        }
        newChannel.save(function (error, channelResponse) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message ? error.message : error
                });
            }

            if (channelResponse) {
                return res.status(200).json({
                    success: true,
                    message: 'Channel Created successfully',
                    channel: {
                        name: channelResponse.name,
                        description: channelResponse.description,
                        subscriber: channelResponse.subscriber,
                        isVerified: channelResponse.isVerified,
                        owner: channelOwnerUser
                    }
                });
            }
        });

    }
};

module.exports = authorController;