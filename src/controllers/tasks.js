'use strict';

const config = require('../config');
const TaskModel = require('../models/task');

/**
 * @api {post} / create a new task
 * @apiName CreateNewTask
 * @apiGroup Task
 *
 * @apiParam {String} name Text of the task
 * @apiParam {String} taskList Task list to which the task belongs
 *
 * @apiSuccess {Object} task the Task object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "task": { _id: 5b05b1bcd0a1057cc9f8fcc8,
                    name: 'new task text',
                    taskList: 5b05b08c20877879fca443e6 }
       }
 *
 * @apiError BadRequest The task could not be created..
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Could not create Task. The request body must contain a name and a taskList"
       }
 */
const create = (req, res) => {
  const task = {
    name: req.body.name,
    taskList: req.body.taskListId
  };

  TaskModel.create(task)
    .then(task => {
      res.status(200).json({ task: task });
    })
    .catch(err => {
      res.status(400).json({ err: err });
    });
};

const update = (res, req) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty'
    });
  }

  TaskModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .exec()
    .then(task => res.status(200).json(task))
    .catch(error =>
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      })
    );
};

/**
 * @api {get} /byId/:id Get all tasks of a TaskBoard
 * @apiName GetAllTasks
 * @apiGroup Task
 *
 *
 * @apiSuccess {Array} tasks Array of Task objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "tasks": [{ _id: 5b05a7dedc43694c58fffe01,
                        name: 'dsfs',
                        taskList: 5b05a7cedc43694c58fffdfa }]
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
const getAll = (req, res) => {
  TaskModel.find({ taskList: req.params.id })
    .exec()
    .then(tasks => {
      res.status(200).json({ tasks: tasks });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get task lists.'
      });
    });
};

/**
 * @api {get} /getAllAsignedTasksForUser Get assigned tasks for user
 * @apiName GetAllAsignedTasksForUser
 * @apiGroup Task
 *
 *
 * @apiSuccess {Array} tasks Array of Task objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "tasks": [{ _id: 5b05a7dedc43694c58fffe01,
                        name: 'dsfs',
                        taskList: 5b05a7cedc43694c58fffdfa }]
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

const getAllAsignedTasksForUser = (req, res) => {
  TaskModel.find({ assignee: req.userId })
    .exec()
    .then(tasks => {
      res.status(200).json({
        tasks
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get tasks.'
      });
    });
};

/**
 * @api {delete} /:id Delete a task by id
 * @apiName DeleteById
 * @apiGroup Task
 *
 *
 * @apiSuccess {Object} task The deleted task.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          _id: 5b08195d4143cb94bc8909fe,
          name: 'dcdcdc',
          taskList: 5b08028b3def607f8dda34c8
       }
 *
 * @apiError BadRequest Generic error. Could not get delete task.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not delete the task."
       }
 */
const deleteById = (req, res) => {
  TaskModel.findByIdAndRemove(req.params.id)
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
  create,
  update,
  getAll,
  getAllAsignedTasksForUser,
  deleteById
};
