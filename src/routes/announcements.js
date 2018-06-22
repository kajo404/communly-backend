'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AnnouncementsController = require('../controllers/announcement-controller');

router.post(
  '/',
  middlewares.checkAuthentication,
  AnnouncementsController.create
);

router.get(
  '/',
  middlewares.checkAuthentication,
  AnnouncementsController.getAll
);

router.delete(
  '/:announcementid',
  middlewares.checkAuthentication,
  AnnouncementsController.deleteAnnouncement
);

router.post(
  '/:announcementid/upvotes',
  middlewares.checkAuthentication,
  AnnouncementsController.upvote
);

router.post(
  '/:announcementid/downvotes',
  middlewares.checkAuthentication,
  AnnouncementsController.downvote
);

router.delete(
  '/:announcementid/votes',
  middlewares.checkAuthentication,
  AnnouncementsController.deleteVote
);

module.exports = router;
