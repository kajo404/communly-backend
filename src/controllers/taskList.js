'use strict';

const config = require('../config');
const TaskListModel = require('../models/taskList');

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
 * @api {post} / create a new TaskList
 * @apiName CreateNewTaskList
 * @apiGroup TaskList
 *
 * @apiParam {String} author The author of the task list.
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
    title: req.body.title
  };

  TaskListModel.create(taskList)
    .then(tasklist => {
      res.status(200).json({
        taskList: taskList
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
          members: [],
          _id: 5b08379a8177f2995a46db13,
          author: 5b05cdd090ed5121c826edf9,
          title: 'Grocery list',
          creationDate: 2018-05-25T16:19:38.711Z }
       }
 *
 * @apiError BadRequest Generic error. Could not get delete the task list.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not delete the task list."
       }
 */
const deleteById = (req, res) => {
  TaskListModel.findByIdAndRemove(req.params.id)
    .exec()
    .then(tasklist => {
      res.status(200).json(tasklist);
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Could not delete Task List'
      });
    });
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById
};
