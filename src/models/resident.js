'use strict';

const mongoose = require('mongoose');

// Define the user schema

const ResidentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

ResidentSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('User', ResidentSchema);
