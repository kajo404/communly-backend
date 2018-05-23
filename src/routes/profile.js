'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const ProfileController = require('../controllers/profile');

router.post('/fullProfile', ProfileController.fullProfile);

module.exports = router;
