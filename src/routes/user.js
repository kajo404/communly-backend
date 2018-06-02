'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const UsersController = require('../controllers/user');

router.get('/', middlewares.checkAuthentication, UsersController.getAll);

module.exports = router;
