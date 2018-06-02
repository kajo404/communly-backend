'use strict';

const AnnouncementModel = require('../models/announcement');
const UserModel = require('../models/user');

/**
 * @api {get} /announcements Get all Announcements
 * @apiName GetAllAnnouncements
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
const getAll = (req, res) => {
  AnnouncementModel.find({})
    .exec()
    .then(announcements => {
      AnnouncementModel.populate(
        announcements,
        { path: 'author', model: UserModel },
        function(error, announcements) {
          if (error) {
            res.status(400).json({
              error: 'Bad Request',
              message: 'Generic error. Could not get announcements.'
            });
          }
          res.status(200).json({ announcements });
        }
      );
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Generic error. Could not get announcements.'
      });
    });
};

/**
 * @api {get} /getAnnoncementsForUser Get all Announcements for user
 * @apiName GetAnnoncementsForUser
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
const getAnnoncementsForUser = (req, res) => {
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
 * @api {post} / Create a new Announcement
 * @apiName CreateNewAnnouncement
 * @apiGroup Announcements
 *
 * @apiParam {String} author The author of the announcement.
 * @apiParam {String} title The title of the announcement.
 * @apiParam {String} content The content of the announcement.
 * @apiParam {Boolean} isVotable True if the announcement is votable.
 *
 * @apiSuccess {Object} announcement The announcement object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "announcement": 
          {
                title: 'Hello World',
                content: 'abcde',
                author: 'Lara Marie Reimer',
                creationDate: '19/05/2018',
                isVotable: false,
                upvotes: [],
                downvotes: []
            }
       }
 *
 * @apiError BadRequest The request body must contain an author, a title and whether it is votable or not.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain an author and a title and whether it is votable or not."
       }
 */
const create = (req, res) => {
  const announcement = {
    author: req.userId,
    title: req.body.title,
    content: req.body.content,
    isVotable: req.body.isVotable,
    creationDate: Date.now(),
    upvotes: [],
    downvotes: []
  };

  AnnouncementModel.create(announcement)
    .then(announcement => {
      announcement.populate('author', function(error, announcement) {
        if (error) {
          res.status(400).json({
            error: 'Bad Request',
            message: 'Could not create announcement'
          });
        }
        res.status(200).json({ announcement: announcement });
      });
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Could not create announcement'
      });
    });
};

module.exports = {
  getAll,
  getAnnoncementsForUser,
  create
};
