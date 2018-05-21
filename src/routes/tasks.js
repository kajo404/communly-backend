'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TasksController = require('../controllers/tasks');

// router.get('/', TasksController.getAll);
// router.get('/:id', TasksController.getById);
router.post('/', TasksController.create);
// router.put('/assign', TasksController.assign);
// router.put('/complete', TasksController.complete);

module.exports = router;
