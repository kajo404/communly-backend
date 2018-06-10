'use strict';

const mongoose = require('mongoose');

// Define the task schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

TaskSchema.set('versionKey', false);

// Export the Task Module
module.exports = mongoose.model('Task', TaskSchema);
