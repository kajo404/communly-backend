'use strict';

const config = require('../config');
const UserModel = require('../models/user');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');

/**
 * @api {get} /userAmount Get amount of user
 * @apiName GetAmountUsers
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Total count of users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "userAmount": 100
       }
 *
 * @apiError BadRequest Generic error. Could not get number of users.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get number of users."
       }
 */

const getUserAmount = (req, res) => {
  UserModel.find({})
    .count()
    .exec()
    .then(userAmount => {
      res.status(200).json({
        userAmount: userAmount
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get number of users.'
      });
    });
};

module.exports = {
  checkAdminRights,
  getUserAmount
};
