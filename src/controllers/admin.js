'use strict';

const config = require('../config');
const UserModel = require('../models/user');
const AnnouncementModel = require('../models/announcement');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');

/**
 * @api {get} /userAmount Get amount of user
 * @apiName GetUserAmount
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

/**
 * @api {get} /announcementAmount Get amount of announcements
 * @apiName GetAnnouncementAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Total count of announcements.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "announcementAmount": 100
       }
 *
 * @apiError BadRequest Generic error. Could not get number of announcements.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get number of announcements."
       }
 */

const getAnnouncementAmount = (req, res) => {
  AnnouncementModel.find({})
    .count()
    .exec()
    .then(announcementAmount => {
      res.status(200).json({
        announcementAmount: announcementAmount
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get number of announcements.'
      });
    });
};

/**
 * @api {get} /tasklistAmount Get amount of tasklists
 * @apiName GetTasklistAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Total count of tasklists.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "tasklistAmount": 100
       }
 *
 * @apiError BadRequest Generic error. Could not get number of tasklists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get number of tasklists."
       }
 */

const getTasklistAmount = (req, res) => {
  TaskListModel.find({})
    .count()
    .exec()
    .then(tasklistAmount => {
      res.status(200).json({
        tasklistAmount: tasklistAmount
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get number of tasklists.'
      });
    });
};

/**
 * @api {get} /taskAmount Get amount of tasks
 * @apiName GetTaskAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Total count of tasks.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskAmount": 200,
          "doneTaskAmount": 100,
          "undoneTaskAmount": 100
       }
 *
 * @apiError BadRequest Generic error. Could not get number of tasks.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get number of tasks."
       }
 */

const getTaskAmount = (req, res) => {
  TaskModel.find({})
    .count()
    .exec()
    .then(taskAmount => {
      TaskModel.find({ isDone: true })
        .count()
        .exec()
        .then(doneTaskAmount => {
          var undoneTaskAmount = taskAmount - doneTaskAmount;
          res.status(200).json({
            taskAmount: taskAmount,
            doneTaskAmount: doneTaskAmount,
            undoneTaskAmount: undoneTaskAmount
          });
        })
        .catch(err => {
          res.status(400).json({
            error: 'Bad Request',
            message: 'Generic error. Could not get number of done tasks.'
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get number of tasks.'
      });
    });
};

/**
 * @api {get} /announcementAmount Get amount of announcements
 * @apiName GetAnnouncementAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Total count of announcements.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "announcementAmount": 100
       }
 *
 * @apiError BadRequest Generic error. Could not get number of announcements.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get number of announcements."
       }
 */

const getMaxAnnouncementAmount = (req, res) => {
  AnnouncementModel.aggregate([
    {
      $group: {
        _id: '$author',
        count: { $sum: 1 }
      }
    }
  ])
    .sort({ count: -1 })
    .limit(1)
    .exec()
    .then(maxAnnouncementAmount => {
      res.status(200).json({
        maxAnnouncementAmount: maxAnnouncementAmount[0].count
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get number of announcements.'
      });
    });
};

module.exports = {
  getUserAmount,
  getAnnouncementAmount,
  getTasklistAmount,
  getTaskAmount,
  getMaxAnnouncementAmount
};
