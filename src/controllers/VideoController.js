const { validationResult } = require("express-validator");
var ObjectId = require('mongoose').Types.ObjectId;
const { Channel, User, Video } = require('../models');

const videoController = {
    async getUserVideos(req, res) {
        if (!req.user.id) {
            return res.status(400).json({
                succcess: false,
                message: 'You must be authorized user'
            })
        }

        const userChannel = await Channel.findOne({ owner: new ObjectId(req.user.id) }, function (error, userChannel) {
            if (error) {
                return res.status(400).json({
                    succcess: false,
                    message: 'Channel not exists'
                })
            }

            if (!userChannel) {
                return res.status(400).json({
                    succcess: false,
                    message: 'Channel not exists'
                })
            }
        });

        const ChannelId = userChannel._id;

        const allVideos = await Video.find({ channel: new ObjectId(ChannelId) });

        var responseData = {
            success: true,
            channel: userChannel,
            totalVideos: allVideos.length,
            videos: allVideos
        };

        res.status(200).json(responseData);

    },
    async getAllVideos(req, res) {
        if (!req.user.id) {
            return res.status(400).json({
                succcess: false,
                message: 'You must be authorized user'
            })
        }

        const totalVideos = await Video.countDocuments({}, function (err, count) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                });
            }

            if (count === 0) {
                return res.status(404).json({
                    success: true,
                    message: 'No videos found'
                });
            }
        });

        const allVideos = await Video.find().populate('channel', '-_id name description isVerified');

        var responseData = {
            success: true,
            video_count: totalVideos,
            videos: allVideos
        };

        res.status(200).json(responseData);

    },
    async saveVideo(req, res) {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                succcess: false,
                errors: errors.array()
            })
        }

        if (!req.user.id) {
            return res.status(400).json({
                succcess: false,
                message: 'You must be authorized user'
            })
        }

        const userChannel = await Channel.findOne({ owner: new ObjectId(req.user.id) }, function (error, userChannel) {
            if (error) {
                return res.status(400).json({
                    succcess: false,
                    message: 'Channel not exists'
                })
            }

            if (!userChannel) {
                return res.status(400).json({
                    succcess: false,
                    message: 'Channel not exists'
                })
            }
        });
        const ChannelId = userChannel._id;

        const newVideo = new Video(req.body);
        newVideo.channel = ChannelId;

        await newVideo.save(function (error, newVideo) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message ? error.message : error
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Video Created successfully',
                video: newVideo
            });
        });
    },
    async updateVideo(req, res) {

        if (!req.user.id) {
            return res.status(400).json({
                succcess: false,
                message: 'You must be authorized user'
            })
        }

        const userChannel = await Channel.findOne({ owner: new ObjectId(req.user.id) }, function (error, userChannel) {
            if (error) {
                return res.status(400).json({
                    succcess: false,
                    message: 'Channel not exists'
                })
            }

            if (!userChannel) {
                return res.status(400).json({
                    succcess: false,
                    message: 'Channel not exists'
                })
            }
        });

        const ChannelId = userChannel._id;

        const CurrentVideo = await Video.findOne({ channel: new ObjectId(ChannelId), _id: req.params.video_id }, function (error, CurrentVideo) {
            if (error || !Video) {
                return res.status(400).json({
                    succcess: false,
                    message: 'You must be authorized user'
                })
            }
        });

        const updatedVideo = await Video.findByIdAndUpdate(req.params.video_id, req.body, { new: true }, function (error, updatedVideo) {
            if (error) {
                return res.status(404).json({
                    success: true,
                    message: 'Video Update failed'
                });
            }
        }).populate('channel');

        return res.status(200).json({
            success: true,
            message: 'Video Updated successfully',
            video: updatedVideo
        });

    }
};

module.exports = videoController;