'use strict';

const config = require('../config');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');

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

//Get all tasks of a specific board
const getAll = (req, res) => {
  TaskModel.find({ taskList: req.params.id })
    .exec()
    .then(tasklists => {
      res.status(200).json({ tasks: tasklists });
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
