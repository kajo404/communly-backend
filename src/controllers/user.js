'use strict';

const config = require('../config');
const UserModel = require('../models/user');
const TaskModel = require('../models/task');
const TaskListModel = require('../models/taskList');
const AnnouncementModel = require('../models/announcement');
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');

var s3 = new AWS.S3();
var myBucket = 'communly-images';

const getAll = (req, res) => {
  UserModel.find({}, 'firstname lastname')
    .exec()
    .then(users => {
      res.status(200).json({
        users: users
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get users.'
      });
    });
};

/**
 * @api {get} /annoncements Get all Announcements for user
 * @apiName GetAnnoncements
 * @apiGroup Announcements
 *
 *
 * @apiSuccess {Array} announcements Array of announcement objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "announcements":
          [
              {
                title: 'Hello World',
                content: 'abcde',
                author: 'Lara Marie Reimer',
                creationDate: '19/05/2018',
                isVotable: false,
                upvotes: [],
                downvotes: []
            }
          ]
       }
 *
 * @apiError BadRequest Generic error. Could not get announcements.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get announcements."
       }
 */
const getAnnoncements = (req, res) => {
  AnnouncementModel.find({ author: req.userId })
    .exec()
    .then(announcements => {
      res.status(200).json({ announcements });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get announcements.'
      });
    });
};

/**

 * @api {get} /tasklists/author Get TaskLists for user as author
 * @apiName GetTasklistsAsAuthor
 * @apiGroup TaskList
 *
 *
 * @apiSuccess {Array} taskLists Array of taskList objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskLists": [ {
                            members: [],
                            _id: 5b057b36dc43694c58fffdef,
                            title: 'Dinner Grocery List',
                            creationDate: 2018-05-23T14:31:18.061Z }
        ]
       }
 *
 * @apiError BadRequest Generic error. Could not get task lists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get task lists."
       }
 */
const getTasklistsAsAuthor = (req, res) => {
  TaskListModel.find({ author: req.userId })
    .exec()
    .then(tasklists => {
      res.status(200).json({
        tasklists
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get task lists.'
      });
    });
};

/**
 * @api {get} /tasklists/member Get TaskLists for user as memeber
 * @apiName GetTasklistsAsMemeber
 * @apiGroup TaskList
 *
 *
 * @apiSuccess {Array} taskLists Array of taskList objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "taskLists": [ {
                            members: [],
                            _id: 5b057b36dc43694c58fffdef,
                            title: 'Dinner Grocery List',
                            creationDate: 2018-05-23T14:31:18.061Z }
        ]
       }
 *
 * @apiError BadRequest Generic error. Could not get task lists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get task lists."
       }
 */
const getTasklistsAsMemeber = (req, res) => {
  TaskListModel.find({ members: req.userId })
    .exec()
    .then(tasklists => {
      res.status(200).json({
        tasklists
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get task lists.'
      });
    });
};

/**
 * @api {put} /data update firstname lastname email dateOfBirth
 * @apiName update user data
 * @apiGroup User
 *
 * @apiParam {String} firstname 
 * @apiParam {String} lastname 
* @apiParam {String} email 
  * @apiParam {String} dateOfBirth
 *
 * @apiSuccess {String} _id user id.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "_id": "5afc47f1234d724bc4c90b44"
       }
 *
 * @apiError BadRequest The request body must contain a name/emial/dateOfBirth property.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a firstname property"
       }
 */
const updateData = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'firstname'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a firstname property'
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'lastname'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a lastname property'
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'email'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a email property'
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'dateOfBirth'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a dateOfBirth property'
    });

  var update = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth
  };

  UserModel.findByIdAndUpdate(req.userId, update)
    .exec()
    .then(user => {
      if (!user)
        return res.status(404).json({
          error: 'Not Found',
          message: `User not found`
        });

      res.status(200).json(user);
    })
    .catch(error =>
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      })
    );
};

/**
 * @api {put} /password password
 * @apiName update user password
 * @apiGroup User
 *
* @apiParam {String}password.
 *
 * @apiSuccess {String} token Access token for the User.
 *
* @apiSuccess {String} _id user id.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "_id": "5afc47f1234d724bc4c90b44"
       }
 *
 * @apiError BadRequest The request body must contain a password property.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a password property"
       }
 */
const updatePassword = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a password property'
    });

  var update = {
    password: bcrypt.hashSync(req.body.password, 8)
  };

  UserModel.findByIdAndUpdate(req.userId, update)
    .exec()
    .then(user => {
      if (!user)
        return res.status(404).json({
          error: 'Not Found',
          message: `User not found`
        });

      res.status(200).json(user);
    })
    .catch(error =>
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      })
    );
};

/**
 * @api {put} /picture update profile image
 * @apiName change user picture
 * @apiGroup User
 *
 * @apiParam {String} image.
 *
 * @apiSuccess {String} token Access token for the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "_id": "5afc47f1234d724bc4c90b44"
       }
 *
 * @apiError BadRequest The request body must contain a imageData property.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a imageData property"
       }
 */
const updatePicture = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'imageData'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a image property'
    });

  var update = { image: req.body.imageData };
  var contentType = update.image.slice(5, update.image.indexOf(';'));
  var buf = new Buffer(
    update.image.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  var s3Bucket = new AWS.S3({ params: { Bucket: myBucket } });
  var params = {
    Key: req.userId,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: contentType
  };
  s3Bucket.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully uploaded data to myBucket/myKey');
    }
  });
};
/**
 * @api {get} /tasks for user
 * @apiName getAsignedTasks
 * @apiGroup Task
 *
 *
 * @apiSuccess {Array} tasks Array of Task objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "tasks": [{ _id: 5b05a7dedc43694c58fffe01,
                        name: 'dsfs',
                        taskList: 5b05a7cedc43694c58fffdfa }]
       }
 *
 * @apiError BadRequest Generic error. Could not get tasks.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "Generic error. Could not get tasks."
       }
 */

const getAsignedTasks = (req, res) => {
  TaskModel.find({ assignee: req.userId })
    .exec()
    .then(tasks => {
      res.status(200).json({
        tasks
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get tasks.'
      });
    });
};

module.exports = {
  getAll,
  getAnnoncements,
  getTasklistsAsMemeber,
  getTasklistsAsAuthor,
  getAsignedTasks,
  updateData,
  updatePassword,
  updatePicture
};
