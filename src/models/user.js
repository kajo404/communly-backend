'use strict';

const mongoose = require('mongoose');

// Define the user schema

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    dateOfBirth: {
      type: Date
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    roles: {
      type: [
        {
          type: String,
          enum: ['user', 'admin']
        }
      ],
      default: ['user']
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

UserSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);
