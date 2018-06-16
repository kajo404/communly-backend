'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const UsersController = require('../controllers/user');

router.get('/', middlewares.checkAuthentication, UsersController.getAll);
router.get(
  '/annoncements',
  middlewares.checkAuthentication,
  UsersController.getAnnoncements
);
router.get(
  '/tasklists/author',
  middlewares.checkAuthentication,
  UsersController.getTasklistsAsAuthor
);
router.get(
  '/tasklists/member',
  middlewares.checkAuthentication,
  UsersController.getTasklistsAsMemeber
);
router.get(
  '/tasks',
  middlewares.checkAuthentication,
  UsersController.getAsignedTasks
);

router.put(
  '/picture',
  middlewares.checkAuthentication,
  UsersController.updatePicture
);

router.put(
  '/data',
  middlewares.checkAuthentication,
  UsersController.updateData
);

router.put(
  '/password',
  middlewares.checkAuthentication,
  UsersController.updatePassword
);

module.exports = router;
