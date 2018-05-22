'use strict';

const config = require('../config');
const TaskModel = require('../models/task');

const create = (req, res) => {
  const task = {
    name: req.body.title,
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

module.exports = {
  create
};
