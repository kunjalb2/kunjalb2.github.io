const express = require('express');
const { check } = require("express-validator");
const ChannelController = require('../controllers/ChannelController');
const auth = require('../middleware/auth');

const channelRouter = express.Router();

channelRouter.route('/channels')
    .post([
        check("name", "Please enter channel name")
            .not()
            .isEmpty(),
        check("description", "Please enter channel description")
            .not()
            .isEmpty()
    ], auth, ChannelController.saveChannel)
    .get(ChannelController.getAllChannels);

channelRouter.route('/channels/:id')
    .get(ChannelController.getAllVideos)
    .put(ChannelController.updateChannel);

module.exports = channelRouter;
