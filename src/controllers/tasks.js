'use strict';

const config = require('../config');
const TaskModel = require('../models/task');

/**
 * @api {post} /tasks/:taksid/assignUser/:userid Assign a member.
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
  TaskModel.findByIdAndUpdate(req.params.taskid, {
    asignee: new mongoose.mongo.ObjectId(req.params.userid)
  })
    .populate({ path: 'asignee', select: 'name' })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'User could not be assigned to task'
      });
    });
};

module.exports = {
  assignUser
};
