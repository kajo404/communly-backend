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
  upvotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: false }
  ],
  downvotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: false }
  ]
});

AnnouncementSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Announcement', AnnouncementSchema);
