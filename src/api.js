'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var path = require('path');

const middlewares = require('./middlewares');

const auth = require('./routes/auth');
const announcements = require('./routes/announcements');
const taskLists = require('./routes/taskLists');
const tasks = require('./routes/tasks');

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);
api.use('/apidoc', express.static('doc'));

// Basic route
api.get('/', (req, res) => {
  res.sendfile('doc/index.html');
});

// API routes
api.use('/auth', auth);
api.use('/announcements', announcements);

// taskLists routes
api.use('/tasklists', taskLists);

// tasks routes
api.use('/tasks', tasks);

module.exports = api;
