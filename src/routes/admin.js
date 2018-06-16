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

module.exports = router;
