'use strict';

const config = require('../config');
const UserModel = require('../models/user');
const AnnouncementModel = require('../models/announcement');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');

/**
 * @api {get} /amount/user Get amount of user
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
 * @api {get} /amount/announcement Get amount of announcements
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
 * @api {get} /amount/tasklist Get amount of tasklists
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
 * @api {get} /amount/task Get amount of tasks
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
 * @api {get} /stats/annuoncement Get user statistics for announcements
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
    .then(announcements => {
      maxCount = announcements[0].count;
      length = announcements.length;
      minCount = announcements[length - 1].count;
      announcements.forEach(function(entry) {
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
 * @api {get} /stats/tasklist Get user statistics for tasklists
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
 * @api {get} /stats/tasklistMembers Get user statistics for tasklists members
 * @apiName GetUserStatsTasklistMembers
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Max count of tasklistmembers.
 * @apiSuccess {Int} Avg count of tasklistmembers.
 * @apiSuccess {Int} Min count of tasklistmembers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxMembersTasklists": 10,
          "avgMembersTasklists": 2.33,
          "minMembersTasklists": 4
       }
 *
 * @apiError BadRequest Generic error. Could not get tasklists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get tasklist members."
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
        count: { $size: '$members' }
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
            maxMembersTasklists: maxCount,
            avgMembersTasklists: (sum / length).toFixed(2),
            minMembersTasklists: minCount
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
        message: 'Generic error. Could not get tasklist members.'
      });
    });
};

/**
 * @api {get} /stats/task Get user statistics for tasks
 * @apiName GetUserStatsTasks
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Max count of assigned tasks.
 * @apiSuccess {Int} Avg count of assigned tasks.
 * @apiSuccess {Int} Min count of assigned tasks.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxAssignedTasks": 10,
          "avgAssignedTasks": 2.33,
          "minAssignedTasks": 4
       }
 *
 * @apiError BadRequest Generic error. Could not get tasks.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get tasks."
       }
 */

const getUserStatsTasks = (req, res) => {
  var maxCount = 0;
  var minCount = 0;
  var sum = 0;
  var length = 0;
  TaskListModel.aggregate([
    {
      $group: {
        _id: '$assignee',
        count: { $sum: 1 }
      }
    }
  ])
    .sort({ count: -1 })
    .exec()
    .then(tasks => {
      maxCount = tasks[0].count;
      length = tasks.length;
      minCount = tasks[length - 1].count;
      tasks.forEach(function(entry) {
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
            maxAssignedTasks: maxCount,
            avgAssignedTasks: (sum / result.length).toFixed(2),
            minAssignedTasks: minCount
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
        message: 'Generic error. Could not get tasks.'
      });
    });
};

/**
 * @api {get} /stats/doneTask Get user statistics for done tasks
 * @apiName GetUserStatsDoneTasks
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Max count of assigned done tasks.
 * @apiSuccess {Int} Avg count of assigned done tasks.
 * @apiSuccess {Int} Min count of assigned done tasks.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxAssignedDoneTasks": 10,
          "avgAssignedDoneTasks": 2.33,
          "minAssignedDoneTasks": 4
       }
 *
 * @apiError BadRequest Generic error. Could not get done tasks.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get done tasks."
       }
 */

const getUserStatsDoneTasks = (req, res) => {
  var maxCount = 0;
  var minCount = 0;
  var sum = 0;
  var length = 0;
  TaskListModel.aggregate([
    {
      $group: {
        _id: '$assignee',
        count: {
          $sum: {
            $cond: [
              {
                $eq: ['$isDone', true]
              },
              1,
              0
            ]
          }
        }
      }
    }
  ])
    .sort({ count: -1 })
    .exec()
    .then(tasks => {
      maxCount = tasks[0].count;
      length = tasks.length;
      minCount = tasks[length - 1].count;
      tasks.forEach(function(entry) {
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
            maxAssignedDoneTasks: maxCount,
            avgAssignedDoneTasks: (sum / result.length).toFixed(2),
            minAssignedDoneTasks: minCount
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
        message: 'Generic error. Could not get done tasks.'
      });
    });
};

/**
 * @api {get} /stats/undoneTask Get user statistics for undone tasks
 * @apiName GetUserStatsUndoneTasks
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Int} Max count of assigned undone tasks.
 * @apiSuccess {Int} Avg count of assigned undone tasks.
 * @apiSuccess {Int} Min count of assigned undone tasks.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxAssignedUndoneTasks": 10,
          "avgAssignedUndoneTasks": 2.33,
          "minAssignedUndoneTasks": 4
       }
 *
 * @apiError BadRequest Generic error. Could not get done tasks.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get done tasks."
       }
 */

const getUserStatsUndoneTasks = (req, res) => {
  var maxCount = 0;
  var minCount = 0;
  var sum = 0;
  var length = 0;
  TaskListModel.aggregate([
    {
      $group: {
        _id: '$assignee',
        count: {
          $sum: {
            $cond: [
              {
                $eq: ['$isDone', false]
              },
              1,
              0
            ]
          }
        }
      }
    }
  ])
    .sort({ count: -1 })
    .exec()
    .then(tasks => {
      maxCount = tasks[0].count;
      length = tasks.length;
      minCount = tasks[length - 1].count;
      tasks.forEach(function(entry) {
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
            maxAssignedUndoneTasks: maxCount,
            avgAssignedUndoneTasks: (sum / result.length).toFixed(2),
            minAssignedUndoneTasks: minCount
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
        message: 'Generic error. Could not get undone tasks.'
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
  getUserStatsTasklistMembers,
  getUserStatsTasks,
  getUserStatsDoneTasks,
  getUserStatsUndoneTasks
};
