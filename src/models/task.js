'use strict';

const mongoose = require('mongoose');

// Define the user schema

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: false
  },
  taskList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskList',
    require: true
  },
  isDone: { type: Boolean }
});

TaskSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Task', TaskSchema);
