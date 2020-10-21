const express = require('express');
const { check, header } = require("express-validator");
const VideoController = require('../controllers/VideoController');
const auth = require('../middleware/auth');

const videoRouter = express.Router();

videoRouter.route('/videos')
    .get(auth, VideoController.getAllVideos)
    .post(auth, [
        check("title", "Video title is required")
            .not()
            .isEmpty(),
        check("description", "Video desctiption is required")
            .not()
            .isEmpty()
            .escape(),
        check("duration", "Video Duration is required")
            .not()
            .isEmpty()
            .isNumeric(),
        check("url", "Video URL is required")
            .not().isEmpty()
            .isURL().withMessage('Invalid URL'),
    ], auth, VideoController.saveVideo);

videoRouter.route('/user/videos/')
    .get(auth, VideoController.getUserVideos);

videoRouter.route('/videos/:video_id')
    .put(auth, VideoController.updateVideo)

/*videoRouter.route('/channels/:id')
    .get(VideoController.getAllVideos)
    .put(VideoController.updateChannel);*/

module.exports = videoRouter;
