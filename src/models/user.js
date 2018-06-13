'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
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
    },
    image: {
      type: String
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

module.exports = mongoose.model('User', UserSchema);
