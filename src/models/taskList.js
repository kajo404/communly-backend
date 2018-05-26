'use strict';

const mongoose = require('mongoose');

// Define the TaskList schema
const TaskListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  creationDate: { type: Date, default: Date.now },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

TaskListSchema.set('versionKey', false);

// Export the TaskList model
module.exports = mongoose.model('TaskList', TaskListSchema);
