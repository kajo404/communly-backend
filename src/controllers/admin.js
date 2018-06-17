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
 * @api {get} /userStatsAnnuoncements Get user statistics for announcements
 * @apiName GetUserStatsAnnuoncements
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Max count of announcements.
 * @apiSuccess {Int} Avg count of announcements.
 * @apiSuccess {Int} Min count of announcements.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxUserAnnouncements": 10,
          "avgUserAnnouncements": 2.33,
          "minUserAnnouncements": 4
       }
 *
 * @apiError BadRequest Generic error. Could not get announcements.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get announcements."
       }
 */

const getUserStatsAnnuoncements = (req, res) => {
  var maxCount = 0;
  var minCount = 0;
  var sum = 0;
  var length = 0;
  AnnouncementModel.aggregate([
    {
      $group: {
        _id: '$author',
        count: { $sum: 1 }
      }
    }
  ])
    .sort({ count: -1 })
    .exec()
    .then(maxAnnouncementAmount => {
      maxCount = maxAnnouncementAmount[0].count;
      length = maxAnnouncementAmount.length;
      minCount = maxAnnouncementAmount[length - 1].count;
      maxAnnouncementAmount.forEach(function(entry) {
        sum += entry.count;
      });
      UserModel.aggregate([
        {
          $project: {
            firstname: 0,
            lastname: 0,
            email: 0,
            password: 0,
            image: 0,
            created_at: 0,
            updated_at: 0,
            dateOfBirth: 0,
            roles: 0
          }
        }
      ])
        .exec()
        .then(result => {
          if (result.length > length) {
            minCount = 0;
          }
          res.status(200).json({
            maxUserAnnouncements: maxCount,
            avgUserAnnouncements: (sum / result.length).toFixed(2),
            minUserAnnouncements: minCount
          });
        })
        .catch(err => {
          res.status(400).json({
            error: 'Bad Request',
            message: 'Generic error. Could not get users.'
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get announcements.'
      });
    });
};

/**
 * @api {get} /userStatsTasklists Get user statistics for tasklists
 * @apiName GetUserStatsTasklists
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Max count of tasklists.
 * @apiSuccess {Int} Avg count of tasklists.
 * @apiSuccess {Int} Min count of tasklists.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxUserTasklists": 10,
          "avgUserTasklists": 2.33,
          "minUserTasklists": 4
       }
 *
 * @apiError BadRequest Generic error. Could not get tasklists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get tasklists."
       }
 */

const getUserStatsTasklists = (req, res) => {
  var maxCount = 0;
  var minCount = 0;
  var sum = 0;
  var length = 0;
  TaskListModel.aggregate([
    {
      $group: {
        _id: '$author',
        count: { $sum: 1 }
      }
    }
  ])
    .sort({ count: -1 })
    .exec()
    .then(maxTasklistAmount => {
      maxCount = maxTasklistAmount[0].count;
      length = maxTasklistAmount.length;
      minCount = maxTasklistAmount[length - 1].count;
      maxTasklistAmount.forEach(function(entry) {
        sum += entry.count;
      });
      UserModel.aggregate([
        {
          $project: {
            firstname: 0,
            lastname: 0,
            email: 0,
            password: 0,
            image: 0,
            created_at: 0,
            updated_at: 0,
            dateOfBirth: 0,
            roles: 0
          }
        }
      ])
        .exec()
        .then(result => {
          if (result.length > length) {
            minCount = 0;
          }

          res.status(200).json({
            maxUserTasklists: maxCount,
            avgUserTasklists: (sum / result.length).toFixed(2),
            minUserTasklists: minCount
          });
        })
        .catch(err => {
          res.status(400).json({
            error: 'Bad Request',
            message: 'Generic error. Could not get users.'
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get announcements.'
      });
    });
};

/**
 * @api {get} /userStatsTasklists Get user statistics for tasklists
 * @apiName GetUserStatsTasklists
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Max count of tasklists.
 * @apiSuccess {Int} Avg count of tasklists.
 * @apiSuccess {Int} Min count of tasklists.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxUserTasklists": 10,
          "avgUserTasklists": 2.33,
          "minUserTasklists": 4
       }
 *
 * @apiError BadRequest Generic error. Could not get tasklists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get tasklists."
       }
 */

const getUserStatsTasklistMembers = (req, res) => {
  var maxCount = 0;
  var minCount = 0;
  var sum = 0;
  var length = 0;
  TaskListModel.aggregate([
    {
      $project: {
        count: { $size: '$colors' }
      }
    }
  ])
    .sort({ count: -1 })
    .exec()
    .then(maxTasklistAmount => {
      console.log(maxTasklistAmount);
      maxCount = maxTasklistAmount[0].count;
      length = maxTasklistAmount.length;
      minCount = maxTasklistAmount[length - 1].count;
      maxTasklistAmount.forEach(function(entry) {
        sum += entry.count;
      });
      UserModel.aggregate([
        {
          $project: {
            firstname: 0,
            lastname: 0,
            email: 0,
            password: 0,
            image: 0,
            created_at: 0,
            updated_at: 0,
            dateOfBirth: 0,
            roles: 0
          }
        }
      ])
        .exec()
        .then(result => {
          if (result.length > length) {
            minCount = 0;
          }

          res.status(200).json({
            maxUserTasklists: maxCount,
            avgUserTasklists: (sum / result.length).toFixed(2),
            minUserTasklists: minCount
          });
        })
        .catch(err => {
          res.status(400).json({
            error: 'Bad Request',
            message: 'Generic error. Could not get users.'
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get announcements.'
      });
    });
};

module.exports = {
  getUserAmount,
  getAnnouncementAmount,
  getTasklistAmount,
  getTaskAmount,
  getUserStatsAnnuoncements,
  getUserStatsTasklists,
  getUserStatsTasklistMembers
};
