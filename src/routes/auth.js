'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AuthController = require('../controllers/auth');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post(
  '/userPicture',
  middlewares.checkAuthentication,
  AuthController.changeUserPicture
);
router.get('/me', middlewares.checkAuthentication, AuthController.me);
router.get('/logout', AuthController.logout);

module.exports = router;
