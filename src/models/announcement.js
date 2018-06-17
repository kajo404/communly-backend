'use strict';

const mongoose = require('mongoose');

// Define the user schema

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  creationDate: { type: Date, default: Date.now() },
  content: { type: String },
  isVotable: { type: Boolean, default: false },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false
      },
      vote: { type: String, enum: ['up', 'down'] }
    }
  ]
});

AnnouncementSchema.set('versionKey', false);

// Export the Task model
module.exports = mongoose.model('Announcement', AnnouncementSchema);
