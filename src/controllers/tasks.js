'use strict';

const config = require('../config');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');
const mongoose = require('mongoose');

/**
 * @api {post} /tasks/:taskid/assign/:userid Assign a member.
 * @apiName AssignMemberToTask
 * @apiGroup Tasks
 *
 * @apiSuccess {Object} taskList the taskList object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "members": [
          "5afd440d8dfabd74b8297151",
          "5afd440d8dfabd74b8297152",
          "5b098c0e70d4c7235cf9a6a5"
        ],
        "_id": "5b098c0e70d4c7235cf9a6a6",
        "author": "5afd440d8dfabd74b8297151",
        "title": "test",
        "creationDate": "2018-05-26T16:32:14.069Z"
}
 *
 */
const assignUser = (req, res) => {
  TaskListModel.findOne({
    tasks: { $in: [req.params.taskid] }
  })
    .exec()
    .then(taskList => {
      //permission check
      if (
        !(
          taskList.author == req.userId ||
          req.isAdmin == 'true' ||
          taskList.members.indexOf(req.userId) >= 0
        )
      ) {
        return res.status(403).json({
          error: 'Not Allowed',
          message: 'Not allowed to access ressource'
        });
      }
      //assign user
      TaskModel.findByIdAndUpdate(req.params.taskid, {
        assignee: new mongoose.mongo.ObjectId(req.params.userid)
      })
        .populate({ path: 'assignee', select: ['firstname', 'lastname'] })
        .exec()
        .then(task => res.status(200).json(task))
        .catch(error =>
          res.status(500).json({
            error: 'Internal server error',
            message: error.message
          })
        );
    });
};

/**
 * @api {delete} /tasks/:taskid Deletes Task.
 * @apiName DeleteTask
 * @apiGroup Tasks

 *
 * @apiSuccess {Object} taskList the taskList object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "_id": "5b0d4dd54681bd24b629c017",
    "name": "special request for yasna"
}
 *
 */
const deleteTask = (req, res) => {
  //find corresponding task list
  TaskListModel.findOne({
    tasks: { $in: [req.params.taskid] }
  })
    .exec()
    .then(taskList => {
      //permission check
      if (
        !(
          taskList.author == req.userId ||
          req.isAdmin == 'true' ||
          taskList.members.indexOf(req.userId) >= 0
        )
      ) {
        return res.status(403).json({
          error: 'Not Allowed',
          message: 'Not allowed to access ressource'
        });
      }
      //remove task from tasklist
      TaskListModel.findOneAndUpdate(
        { tasks: { $in: [req.params.taskid] } },
        {
          $pull: { tasks: req.params.taskid }
        }
      )
        .exec()
        .then(taskList => {
          //remove task from db
          TaskModel.findByIdAndRemove(req.params.taskid)
            .exec()
            .then(result => {
              res.status(200).json(result);
            })
            .catch(err => {
              res.status(400).json({
                error: 'Bad Request',
                message:
                  'Task could not be deleted but was removed from TaskList'
              });
            });
        })
        .catch(err => {
          res.status(400).json({
            error: 'Bad Request',
            message: 'Task could not be removed from TaskList'
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'TaskList could not be found'
      });
    });
};

module.exports = {
  getAll,
  assignUser,
  deleteTask
};
