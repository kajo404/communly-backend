'use strict';

const config = require('../config');
const UserModel = require('../models/user');

const getAll = (req, res) => {
  UserModel.find({}, 'name')
    .exec()
    .then(users => {
      res.status(200).json({
        users: users
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get users.'
      });
    });
};

module.exports = {
  getAll
};
