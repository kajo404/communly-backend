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

module.exports = router;
