'use strict';

const config = require('../config');
const TaskModel = require('../models/task');

const create = (req, res) => {
  const task = {
    name: req.body.name,
    taskList: req.body.taskListId
  };

  console.log(task);

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
    .then(movie => res.status(200).json(movie))
    .catch(error =>
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      })
    );
};

/**
 * @api {get} /:id Get all tasks of a TaskBoard
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

module.exports = {
  create,
  update,
  getAll
};
