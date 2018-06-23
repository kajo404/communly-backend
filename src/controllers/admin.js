'use strict';

const config = require('../config');
const UserModel = require('../models/user');
const AnnouncementModel = require('../models/announcement');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');

/**
 * @api {get} /amount/user Total User Count
 * @apiName GetUserAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} userAmount count of users.
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
 * @api {get} /amount/announcement Total amount of announcements
 * @apiName GetAnnouncementAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} announcementAmount count of announcements.
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
 * @api {get} /amount/tasklist Total amount of Task Lists
 * @apiName GetTasklistAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} tasklistAmount count of tasklists.
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
 * @api {get} /amount/task Total amount of tasks
 * @apiName GetTaskAmount
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} taskAmount count of tasks.
 * @apiSuccess {int} doneTaskAmount count of completed tasks.
 * @apiSuccess {int} openTaskAmount count of open tasks.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskAmount": 200,
          "doneTaskAmount": 100,
          "openTaskAmount": 100
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
          var openTaskAmount = taskAmount - doneTaskAmount;
          res.status(200).json({
            taskAmount: taskAmount,
            doneTaskAmount: doneTaskAmount,
            openTaskAmount: openTaskAmount
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
 * @api {get} /stats/announcement Announcement User Statistics
 * @apiName GetUserStatsAnnouncements
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} maxUserAnnouncements count of announcements.
 * @apiSuccess {int} avgUserAnnouncements count of announcements.
 * @apiSuccess {int} minUserAnnouncements count of announcements.
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

const getUserStatsAnnouncements = (req, res) => {
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
 * @api {get} /stats/tasklist Task List User Statistics
 * @apiName GetUserStatsTasklists
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} maxUserTasklists count of tasklists.
 * @apiSuccess {int} avgUserTasklists count of tasklists.
 * @apiSuccess {int} minUserTasklists count of tasklists.
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
 * @api {get} /stats/tasklistMembers Task Lists Member Statistics
 * @apiName GetUserStatsTasklistMembers
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} maxMembersTasklists count of tasklistmembers.
 * @apiSuccess {int} avgMembersTasklists count of tasklistmembers.
 * @apiSuccess {int} minMembersTasklists count of tasklistmembers.
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
 * @api {get} /stats/task Task User Statistics
 * @apiName GetUserStatsTasks
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} maxAssignedTasks count of assigned tasks.
 * @apiSuccess {int} avgAssignedTasks count of assigned tasks.
 * @apiSuccess {int} minAssignedTasks count of assigned tasks.
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
  var nullIdFound = false;
  TaskModel.aggregate([
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
      tasks.forEach(function(entry) {
        if (entry._id !== null) {
          sum += entry.count;
        } else {
          nullIdFound = true;
        }
      });

      if (tasks.length > 1) {
        if (tasks[0]._id === null) {
          maxCount = tasks[1].count;
        } else {
          maxCount = tasks[0].count;
        }
      } else {
        if (tasks[0]._id === null) {
          maxCount = 0;
        } else {
          maxCount = tasks[0].count;
        }
      }

      if (nullIdFound) {
        length = tasks.length - 1;
      } else {
        length = tasks.length;
      }

      if (tasks[tasks.length - 1]._id !== null) {
        minCount = tasks[tasks.length - 1].count;
      } else {
        if (tasks.length > 1) {
          minCount = tasks[tasks.length - 2].count;
        } else {
          minCount = 0;
        }
      }
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
 * @api {get} /stats/doneTask Done Tasks User Statistics
 * @apiName GetUserStatsDoneTasks
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} maxAssignedDoneTasks count of assigned done tasks.
 * @apiSuccess {int} avgAssignedDoneTasks count of assigned done tasks.
 * @apiSuccess {int} minAssignedDoneTasks count of assigned done tasks.
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
  var nullIdFound = false;
  TaskModel.aggregate([
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
      tasks.forEach(function(entry) {
        if (entry._id !== null) {
          sum += entry.count;
        } else {
          nullIdFound = true;
        }
      });

      if (tasks.length > 1) {
        if (tasks[0]._id === null) {
          maxCount = tasks[1].count;
        } else {
          maxCount = tasks[0].count;
        }
      } else {
        if (tasks[0]._id === null) {
          maxCount = 0;
        } else {
          maxCount = tasks[0].count;
        }
      }

      if (nullIdFound) {
        length = tasks.length - 1;
      } else {
        length = tasks.length;
      }

      if (tasks[tasks.length - 1]._id !== null) {
        minCount = tasks[tasks.length - 1].count;
      } else {
        if (tasks.length > 1) {
          minCount = tasks[tasks.length - 2].count;
        } else {
          minCount = 0;
        }
      }
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
 * @api {get} /stats/openTask Open Tasks User Statistics
 * @apiName GetUserStatsOpenTasks
 * @apiGroup Admin
 *
 *
 * @apiSuccess {int} maxAssignedOpenTasks count of assigned open tasks.
 * @apiSuccess {int} avgAssignedOpenTasks count of assigned open tasks.
 * @apiSuccess {int} minAssignedOpenTasks count of assigned open tasks.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "maxAssignedOpenTasks": 10,
          "avgAssignedOpenTasks": 2.33,
          "minAssignedOpenTasks": 4
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

const getUserStatsOpenTasks = (req, res) => {
  var maxCount = 0;
  var minCount = 0;
  var sum = 0;
  var length = 0;
  var nullIdFound = false;
  TaskModel.aggregate([
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
      tasks.forEach(function(entry) {
        if (entry._id !== null) {
          sum += entry.count;
        } else {
          nullIdFound = true;
        }
      });

      if (tasks.length > 1) {
        if (tasks[0]._id === null) {
          maxCount = tasks[1].count;
        } else {
          maxCount = tasks[0].count;
        }
      } else {
        if (tasks[0]._id === null) {
          maxCount = 0;
        } else {
          maxCount = tasks[0].count;
        }
      }

      if (nullIdFound) {
        length = tasks.length - 1;
      } else {
        length = tasks.length;
      }

      if (tasks[tasks.length - 1]._id !== null) {
        minCount = tasks[tasks.length - 1].count;
      } else {
        if (tasks.length > 1) {
          minCount = tasks[tasks.length - 2].count;
        } else {
          minCount = 0;
        }
      }
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
            maxAssignedOpenTasks: maxCount,
            avgAssignedOpenTasks: (sum / result.length).toFixed(2),
            minAssignedOpenTasks: minCount
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
        message: 'Generic error. Could not get open tasks.'
      });
    });
};

module.exports = {
  getUserAmount,
  getAnnouncementAmount,
  getTasklistAmount,
  getTaskAmount,
  getUserStatsAnnouncements,
  getUserStatsTasklists,
  getUserStatsTasklistMembers,
  getUserStatsTasks,
  getUserStatsDoneTasks,
  getUserStatsOpenTasks
};
