'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AdminController = require('../controllers/admin');

router.get(
  '/userAmount',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserAmount
);

router.get(
  '/announcementAmount',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getAnnouncementAmount
);

router.get(
  '/tasklistAmount',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getTasklistAmount
);

router.get(
  '/taskAmount',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getTaskAmount
);

router.get(
  '/maxAnnouncementAmount',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getMaxAnnouncementAmount
);

module.exports = router;
