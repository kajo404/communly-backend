'use strict';

const mongoose = require('mongoose');
const Task = require('./task');

// Define the TaskList schema
const TaskListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  creationDate: { type: Date, default: Date.now },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

TaskListSchema.set('versionKey', false);

TaskListSchema.post('findOneAndRemove', function(doc, next) {
  Task.remove({ _id: { $in: doc.tasks } }).exec();
  next();
});

// Export the TaskList model
module.exports = mongoose.model('TaskList', TaskListSchema);
