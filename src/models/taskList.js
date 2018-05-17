'use strict';

const mongoose = require('mongoose');

// Define the user schema

const TaskListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  creationDate: { type: Date, default: Date.now },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

TaskListSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('TaskList', TaskListSchema);
