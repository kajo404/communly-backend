'use strict';

const config = require('../config');
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
          "taskList": { title: 'some title', author: 'userID', ... TODO }
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
      select: ['name', 'asignee', 'isDone'],
      populate: { path: asignee, select: 'name' }
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
  TaskListModel.find({})
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
      populate: { path: 'assignee', select: 'name' }
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
 * @api {post} /tasklists create a new TaskList
 * @apiName CreateNewTaskList
 * @apiGroup TaskList
 *
 * @apiParam {String} title The title of the task list.
 * @apiParam {String[]} [members] Users that can access this task list
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
    members: req.body.members,
    tasks: req.body.tasks
  };

  TaskListModel.create(taskList)
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
      select: ['name', 'asignee', 'isDone'],
      populate: { path: asignee, select: 'name' }
    })
    .then(tasklist => {
      res.status(200).json({
        tasklist
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
 * @api {post} /tasklists/:id/addTask Add a new task to a task list. Updates if task already exists
 * @apiName AddTaskToTaskList
 * @apiGroup TaskList
 *
 * @apiParam {String} name Name of the new task.
 * @apiParam {String} [asignee] id of the user assigned to the task.
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
const addTask = (req, res) => {
  TaskListModel.findOne({ _id: new mongoose.mongo.ObjectId(req.params.id) })
    .exec()
    .then(tasklist => {
      if (!(req.isAdmin || req.userId == tasklist.author)) {
        return res.status(403).json({
          error: 'Access Denied',
          message:
            'Only admins or the author of the task list can add new members'
        });
      }
      TaskListModel.findOneAndUpdate(
        {
          _id: new mongoose.mongo.ObjectId(req.params.id)
        },
        {
          $push: {
            tasks: {
              name: req.body.name,
              asignee: new mongoose.mongo.ObjectId(req.body.asignee)
            }
          }
        },
        { new: true },
        { upsert: true }
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
          select: ['name', 'asignee', 'isDone'],
          populate: { path: asignee, select: 'name' }
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
 * @api {post} /tasklists/:id/addMember Add a new member to a task list.
 * @apiName AddMemberToTaskList
 * @apiGroup TaskList
 *
 * @apiParam {String} memberId The User to add to the task list.
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
  TaskListModel.findOne({ _id: new mongoose.mongo.ObjectId(req.params.id) })
    .exec()
    .then(tasklist => {
      if (!(req.isAdmin === 'true' || req.userId == tasklist.author)) {
        return res.status(403).json({
          error: 'Access Denied',
          message:
            'Only admins or the author of the task list can add new members'
        });
      }
      if (tasklist.members.indexOf(req.body.memberId) >= 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'User already member of the task list'
        });
      } else {
        TaskListModel.findOneAndUpdate(
          {
            _id: new mongoose.mongo.ObjectId(req.params.id)
          },
          {
            $push: { members: new mongoose.mongo.ObjectId(req.body.memberId) }
          },
          { new: true }
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
            select: ['name', 'asignee', 'isDone'],
            populate: { path: asignee, select: 'name' }
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
      }
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
  TaskListModel.findOne({ _id: new mongoose.mongo.ObjectId(req.params.id) })
    .exec()
    .then(tasklist => {
      if (req.isAdmin === 'true' || tasklist.author == req.userId) {
        TaskListModel.remove({
          _id: new mongoose.mongo.ObjectId(req.params.id)
        })
          .exec()
          .then(removed => {
            res.status(200).json({ removed });
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
  create,
  deleteById,
  addUser
};
