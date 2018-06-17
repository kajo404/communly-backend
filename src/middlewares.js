'use strict';

const jwt = require('jsonwebtoken');

const config = require('./config');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

const checkAuthentication = (req, res, next) => {
  // check header or url parameters or post parameters for token

  const token = req.headers['authorization'];

  if (token === undefined) {
    return res.status(400).send({
      error: 'Bad Request',
      message: 'No authorization token included'
    });
  }
  const jwtToken = token.split(' ')[1];

  if (!jwtToken) {
    return res.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid token in request.'
    });
  }

  // verifies secret and checks exp
  jwt.verify(jwtToken, config.JwtSecret, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: 'Unauthorized',
        message: 'Failed to authenticate token.'
      });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

const checkAdminRights = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'User is not an administrator!'
    });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
};

module.exports = {
  allowCrossDomain,
  checkAuthentication,
  checkAdminRights,
  errorHandler
};
