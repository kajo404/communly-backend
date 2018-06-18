'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AdminController = require('../controllers/admin');

router.get(
  '/amount/user',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserAmount
);

router.get(
  '/amount/announcement',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getAnnouncementAmount
);

router.get(
  '/amount/tasklist',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getTasklistAmount
);

router.get(
  '/amount/task',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getTaskAmount
);

router.get(
  '/stats/annuoncement',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserStatsAnnuoncements
);

router.get(
  '/stats/tasklist',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserStatsTasklists
);

router.get(
  '/stats/tasklistMembers',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserStatsTasklistMembers
);

router.get(
  '/stats/task',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserStatsTasks
);

router.get(
  '/stats/doneTask',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserStatsDoneTasks
);

router.get(
  '/stats/undoneTask',
  middlewares.checkAuthentication,
  middlewares.checkAdminRights,
  AdminController.getUserStatsUndoneTasks
);

module.exports = router;
