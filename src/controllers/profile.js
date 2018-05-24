'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');
const AnnouncementModel = require('../models/announcement');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');

/**
 * @api {post} /profile/fullProfile FullProfile
 * @apiName FullProfile
 * @apiGroup User
 *
 * @apiParam {String} email Users email.
 * @apiHeader {String} x-access-token token provided by the login.
 *
 * @apiSuccess {String} user information.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          id: "5b05a9ac87f8c82806ef7952", name: "Eric", dateOfBirth: "2018-05-01T22:00:00.000Z", email: "ejl@gmx.de", roles: Array(1)
       }
 */
const fullProfile = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'id'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a email property'
    });
  UserModel.findById(req.body.id)
    .exec()
    .then(user => {
      res.status(200).json({
        id: user._id,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        roles: user.roles
      });
    })
    .catch(error =>
      res.status(404).json({
        error: 'User Not Found',
        message: error.message
      })
    );
};

module.exports = {
  fullProfile
};
