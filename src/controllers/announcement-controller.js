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
                votes: []
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
                votes: []
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
    votes: []
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

/**
 * @api {delete} /:announcementid Delete an announcement
 * @apiName DeleteAnnouncement
 * @apiGroup Announcements
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError BadRequest You must be admin or author of this announcement to delete.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "You must be admin or author of this announcement to delete."
       }
 */
const deleteAnnouncement = (req, res) => {
  AnnouncementModel.findById(req.params.announcementid)
    .then(announcement => {
      const canDeleteAnnouncement =
        req.isAdmin || announcement.author._id == req.userId;

      if (canDeleteAnnouncement) {
        AnnouncementModel.deleteOne(announcement)
          .then(res.status(200))
          .catch(err => {
            res.status(400).json({
              error: 'Bad Request',
              message: 'Could not delete announcement.'
            });
          });
      } else {
        res.status(403).json({
          error: 'Bad Request',
          message: 'You must be admin or author of this announcement to delete.'
        });
      }

      if (error) {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Could not delete announcement.'
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Could not delete announcement.'
      });
    });
};

/**
 * @api {post} /:announcementid/upvotes Upvote on announcement
 * @apiName UpdateAnnouncementUpvotes
 * @apiGroup Announcements
 *
 * @apiSuccess {Object} announcement The announcement object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     "announcement": 
          { creationDate: 2018-05-23T16:44:15.190Z,
            isVotable: true,
            _id: 5b059a5fa1c1b2024bc547e2,
            votes:
              { vote: [Array],
                _id: 5b265d8d481aac011fe1b8a0,
                user: 5b05a4418db29402fdeb3eda 
              },
            author: 5b048af5ccb271001bdfbd03,
            title: 'Hello!',
            content: 'This is another announcement' 
          }
 *
 * @apiError BadRequest The request body must contain a user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a user."
       }
 */
const upvote = (req, res) => {
  AnnouncementModel.findById(req.params.announcementid).then(announcement => {
    const userVote = announcement.votes.find(voter => voter.user == req.userId);

    if (userVote) {
      userVote.vote = 'up';
      const voteIndex = announcement.votes.indexOf(userVote);
      announcement.votes[voteIndex] = userVote;
    } else {
      announcement.votes.push({
        vote: 'up',
        user: req.userId
      });
    }

    announcement
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Announcement could not be updated.'
        });
      });
  });
};

/**
 * @api {post} /:announcementid/downvotes Downvote on announcement
 * @apiName UpdateAnnouncementDownvotes
 * @apiGroup Announcements
 *
 * @apiSuccess {Object} announcement The announcement object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "announcement": 
          { creationDate: 2018-05-23T16:44:15.190Z,
            isVotable: true,
            _id: 5b059a5fa1c1b2024bc547e2,
            votes:
              { vote: 'down',
                _id: 5b265d8d481aac011fe1b8a0,
                user: 5b05a4418db29402fdeb3eda 
              },
            author: 5b048af5ccb271001bdfbd03,
            title: 'Hello!',
            content: 'This is another announcement' 
          }
       }
 *
 * @apiError BadRequest The request body must contain a user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a user."
       }
 */
const downvote = (req, res) => {
  AnnouncementModel.findById(req.params.announcementid).then(announcement => {
    const userVote = announcement.votes.find(voter => voter.user == req.userId);

    if (userVote) {
      userVote.vote = 'down';
      const voteIndex = announcement.votes.indexOf(userVote);
      announcement.votes[voteIndex] = userVote;
    } else {
      announcement.votes.push({
        vote: 'down',
        user: req.userId
      });
    }

    announcement
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Announcement could not be updated.'
        });
      });
  });
};

/**
 * @api {delete} /:announcementid/votes Delete vote on announcement
 * @apiName DeleteAnnouncementVotes
 * @apiGroup Announcements
 *
 * @apiSuccess {Object} announcement The announcement object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     "announcement": 
          { creationDate: 2018-05-23T16:44:15.190Z,
            isVotable: true,
            _id: 5b059a5fa1c1b2024bc547e2,
            votes: [],
            author: 5b048af5ccb271001bdfbd03,
            title: 'Hello!',
            content: 'This is another announcement' 
          }
 *
 * @apiError BadRequest The request body must contain a user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a user."
       }
 */
const deleteVote = (req, res) => {
  AnnouncementModel.findById(req.params.announcementid).then(announcement => {
    const userVote = announcement.votes.find(voter => voter.user == req.userId);

    if (userVote) {
      const voteIndex = announcement.votes.indexOf(userVote);
      announcement.votes.splice(voteIndex, 1);
    }

    announcement
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Announcement could not be updated.'
        });
      });
  });
};

module.exports = {
  getAll,
  create,
  deleteAnnouncement,
  upvote,
  downvote,
  deleteVote
};
