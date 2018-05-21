'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TaskListController = require('../controllers/taskList');

router.get('/', TaskListController.getAll);
router.get('/:id', TaskListController.getById);
router.post('/', TaskListController.create);

module.exports = router;
