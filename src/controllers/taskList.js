'use strict';

const config = require('../config');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');
const UserModel = require('../models/user');
const mongoose = require('mongoose');

/**
 * @api {get} /tasklists/:id Get TaskList by ID
 * @apiName GetTaskListByID
 * @apiGroup TaskList
 *
 * @apiParam {String} id Tasklists unique id.
 *
 * @apiSuccess {Object} taskList the taskList object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskList": {
        "members": [],
        "tasks": [],
        "_id": "5b0d09a50986de06c7f7293d",
        "author": {
            "_id": "5afd440d8dfabd74b8297151",
            "name": "Jon Doe"
        },
        "title": "1234",
        "creationDate": "2018-05-29T08:04:53.863Z"
    }
       }
 *
 * @apiError BadRequest The request body must contain a tasklist id.
 * @apiError BadRequest There is no tasklist with the requested id.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a tasklist id"
       }
 */
const getById = (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'The request must contain a tasklist id.'
    });
  }
  TaskListModel.findById(req.params.id)
    .populate({
      path: 'members',
      select: 'name'
    })
    .populate({
      path: 'author',
      select: 'name'
    })
    .populate({
      path: 'tasks',
      select: ['name', 'assignee', 'isDone'],
      populate: {
        path: 'assignee',
        select: 'name'
      }
    })
    .exec()
    .then(taskList => {
      res.status(200).json({
        taskList
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: `No TaskList with id '${req.params.id}' found.`
      });
    });
};

/**
 * @api {get} /tasklists Get all TaskLists
 * @apiName GetAllTaskLists
 * @apiGroup TaskList
 *
 *
 * @apiSuccess {Array} taskLists Array of taskList objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskLists": [ {
                            members: [],
                            _id: 5b057b36dc43694c58fffdef,
                            title: 'Dinner Grocery List',
                            creationDate: 2018-05-23T14:31:18.061Z }
        ]
       }
 *
 * @apiError BadRequest Generic error. Could not get task lists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get task lists."
       }
 */
const getAll = (req, res) => {
  // send only the boards that the user is a member of
  TaskListModel.find({
    members: req.userId
  })
    .populate({
      path: 'members',
      select: 'name'
    })
    .populate({
      path: 'author',
      select: 'name'
    })
    .populate({
      path: 'tasks',
      select: ['name', 'assignee', 'isDone'],
      populate: {
        path: 'assignee',
        select: 'name'
      }
    })
    .exec()
    .then(tasklists => {
      res.status(200).json({
        tasklists
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get task lists.'
      });
    });
};

/**

 * @api {get} /getTasklistsForUserAsAuthor Get TaskLists for user as author
 * @apiName GetTasklistsForUserAsAuthor
 * @apiGroup TaskList
 *
 *
 * @apiSuccess {Array} taskLists Array of taskList objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskLists": [ {
                            members: [],
                            _id: 5b057b36dc43694c58fffdef,
                            title: 'Dinner Grocery List',
                            creationDate: 2018-05-23T14:31:18.061Z }
        ]
       }
 *
 * @apiError BadRequest Generic error. Could not get task lists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get task lists."
       }
 */
const getTasklistsForUserAsAuthor = (req, res) => {
  TaskListModel.find({ author: req.userId })
    .exec()
    .then(tasklists => {
      res.status(200).json({
        tasklists
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get task lists.'
      });
    });
};

/**
 * @api {get} /getTasklistsForUserAsMemeber Get TaskLists for user as memeber
 * @apiName GetTasklistsForUserAsMemeber
 * @apiGroup TaskList
 *
 *
 * @apiSuccess {Array} taskLists Array of taskList objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskLists": [ {
                            members: [],
                            _id: 5b057b36dc43694c58fffdef,
                            title: 'Dinner Grocery List',
                            creationDate: 2018-05-23T14:31:18.061Z }
        ]
       }
 *
 * @apiError BadRequest Generic error. Could not get task lists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get task lists."
       }
 */
const getTasklistsForUserAsMemeber = (req, res) => {
  TaskListModel.find({ members: req.userId })
    .exec()
    .then(tasklists => {
      res.status(200).json({
        tasklists
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get task lists.'
      });
    });
};

/**
 * @api {post} /tasklists create a new TaskList
 * @apiName CreateNewTaskList
 * @apiGroup TaskList
 *
 * @apiParam {String} title The title of the task list.
 *
 * @apiSuccess {Object} taskList the taskList object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskList": { title: 'some title', author: 'userID', ... }
       }
 *
 * @apiError BadRequest The request body must contain an author and a title.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Could not create Task List. The request body must contain an author and a title"
       }
 */
const create = (req, res) => {
  const taskList = {
    author: req.userId,
    title: req.body.title,
    members: [req.userId]
  };

  TaskListModel.create(taskList)
    .then(tasklist => {
      res.status(200).json({
        tasklist //can this return object be populated?
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Could not create Task List'
      });
    });
};

/**
 * @api {post} /tasklists/:id/tasks Add an array of tasks to a task list. Updates if task already exists
 * @apiName AddTaskToTaskList
 * @apiGroup TaskList
 *
 * @apiParam {Task[]} tasks Array of tasks
 * @apiParam {String} [assignee] id of the user assigned to the task.
 *
 * @apiSuccess {Object} taskList the taskList object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "members": [
        {
            "_id": "5afd440d8dfabd74b8297151",
            "name": "Jon Doe"
        }
    ],
    "task":
        {
            "_id": "5b0d4e66dd444525452990aa",
            "name": "stuff to do"
        },
        {
            "_id": "5b0d4e66dd444525452990ab",
            "name": "special request for yasna"
        }
    ],
    "_id": "5b098c0e70d4c7235cf9a6a6",
    "author": {
        "_id": "5afd440d8dfabd74b8297151",
        "name": "Jon Doe"
    },
    "title": "test",
    "creationDate": "2018-05-26T16:32:14.069Z"
}
 *
 */
const addTasks = (req, res) => {
  TaskListModel.findById(req.params.id)
    .exec()
    .then(tasklist => {
      const memberIds = tasklist.members.map(member => member.toString());

      if (!(req.isAdmin === 'true' || memberIds.includes(req.userId))) {
        return res.status(403).json({
          error: 'Access Denied',
          message:
            'Only admins or a member of the task list can add new members'
        });
      }

      TaskModel.create(req.body.task)
        .then(task => {
          // Append to the task board
          TaskListModel.findByIdAndUpdate(req.params.id, {
            $push: {
              tasks: task._id
            }
          })
            .populate({
              path: 'members',
              select: 'name'
            })
            .populate({
              path: 'author',
              select: 'name'
            })
            .populate({
              path: 'tasks',
              select: ['name', 'assignee', 'isDone'],
              populate: {
                path: 'assignee',
                select: 'name'
              }
            })
            .exec()
            .then(result => {
              res.status(200).json(result);
            })
            .catch(err => {
              res.status(400).json({
                error: 'Bad Request',
                message: 'Task could not be added to task list'
              });
            });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({
            error: 'Bad Request',
            message: 'Task could not be added to task list'
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: 'Bad Request',
        message: 'Task could not be added to task list'
      });
    });
};

/**
 * @api {post} /tasklists/:id/members Add new members to a task list.
 * @apiName AddMembersToTaskList
 * @apiGroup TaskList
 *
 * @apiParam {User} members Array of users to add to the task list.
 *
 * @apiSuccess {Object} taskList the taskList object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "members": [
          "5afd440d8dfabd74b8297151",
          "5afd440d8dfabd74b8297152",
          "5b098c0e70d4c7235cf9a6a5"
        ],
        "_id": "5b098c0e70d4c7235cf9a6a6",
        "author": "5afd440d8dfabd74b8297151",
        "title": "test",
        "creationDate": "2018-05-26T16:32:14.069Z"
}
 *
 */
const addUser = (req, res) => {
  TaskListModel.findById(req.params.id)
    .exec()
    .then(tasklist => {
      if (!(req.isAdmin === 'true' || req.userId == tasklist.author)) {
        return res.status(403).json({
          error: 'Access Denied',
          message:
            'Only admins or the author of the task list can add new members'
        });
      }
      TaskListModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            members: req.body.members
          }
        },
        {
          new: true
        }
      )
        .populate({
          path: 'members',
          select: 'name'
        })
        .populate({
          path: 'author',
          select: 'name'
        })
        .populate({
          path: 'tasks',
          select: ['name', 'assignee', 'isDone'],
          populate: {
            path: 'assignee',
            select: 'name'
          }
        })
        .exec()
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(400).json({
            error: 'Bad Request',
            message: 'User could not be added to task list'
          });
        });
    });
};
/**
 * @api {delete} /:id Deletes a task list by id
 * @apiName DeleteById
 * @apiGroup TaskList
 *
 *
 * @apiSuccess {Object} taskList The deleted task list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "n": 1,
          "ok": 1
}
 *
 */
const deleteById = (req, res) => {
  TaskListModel.findById(req.params.id)
    .exec()
    .then(tasklist => {
      if (req.isAdmin === 'true' || tasklist.author == req.userId) {
        TaskListModel.findByIdAndRemove(req.params.id)
          .exec()
          .then(removed => {
            res.status(200).json({
              removed
            });
          });
      } else {
        res.status(403).json({
          error: 'Not Allowed',
          message: 'User is not allowed to remove task'
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        error: 'Not Found',
        message: 'Task List could not be found'
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'User does not exist'
      });
    });
};

module.exports = {
  getAll,
  getById,
  getTasklistsForUserAsAuthor,
  getTasklistsForUserAsMemeber,
  create,
  deleteById,
  addUser,
  addTasks
};
