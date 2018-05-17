'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');

/**
 * @api {post} /auth/login Request User Login
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} email Users unique email address.
 * @apiParam {String} password Users password.
 * 
 * @apiSuccess {String} token Access token for the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0N2YxMjM0ZDcyNGJjNGM5MGI0NCIsImlhdCI6MTUyNjU0NzU0MywiZXhwIjoxNTI2NjMzOTQzfQ.dKr6_xu8PMnBtd09Iu8Sp6dAQoYLW258AhJzbeHMx8M"
       }
 *
 * @apiError Bad Request The request body must contain a password/email property.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a password property"
       }
 */
const login = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a password property'
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'email'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a email property'
    });
  UserModel.findOne({ name: req.body.name })
    .exec()
    .then(user => {
      // check if the password is valid
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) return res.status(401).send({ token: null });

      // if user is found and password is valid
      // create a token
      const token = jwt.sign(
        { id: user._id, name: user.name },
        config.JwtSecret,
        {
          expiresIn: 86400 // expires in 24 hours
        }
      );

      res.status(200).json({ token: token });
    })
    .catch(error =>
      res.status(404).json({
        error: 'User Not Found',
        message: error.message
      })
    );
};

/**
 * @api {post} /auth/register Register new user
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam {String} email Users unique email address.
 * @apiParam {String} password Users password.
 * @apiParam {String} name Name the User would prefer to use
 * @apiParam {Date} [dateOfBirth] Date of birth for the User
 * @apiParam {String} [roles = ['user']] Array of Roles. Can be 'admin','user' or both
 * 
 * 
 * @apiSuccess {String} token Access token for the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0N2YxMjM0ZDcyNGJjNGM5MGI0NCIsImlhdCI6MTUyNjU0NzU0MywiZXhwIjoxNTI2NjMzOTQzfQ.dKr6_xu8PMnBtd09Iu8Sp6dAQoYLW258AhJzbeHMx8M"
       }
 *
 * @apiError Bad Request The request body must contain a password/email/name property.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
          "error": "Bad Request",
          "message": "The request body must contain a password property"
       }
 */
const register = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a password property'
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'name'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a name property'
    });
  if (!Object.prototype.hasOwnProperty.call(req.body, 'email'))
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body must contain a email property'
    });
  const user = Object.assign(req.body, {
    password: bcrypt.hashSync(req.body.password, 8)
  });

  UserModel.create(user)
    .then(user => {
      // if user is registered without errors
      // create a token
      const token = jwt.sign(
        { id: user._id, name: user.name },
        config.JwtSecret,
        {
          expiresIn: 86400 // expires in 24 hours
        }
      );

      res.status(200).json({ token: token });
    })
    .catch(error => {
      if (error.code == 11000) {
        res.status(400).json({
          error: 'User exists',
          message: error.message
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message: error.message
        });
      }
    });
};

/**
 * @api {get} /auth/me Find User by id
 * @apiName MeUser
 * @apiGroup User
 *
 * @apiParam {String} id Users id.
 * @apiHeader {String} x-access-token token provided by the login.
 *   
 * @apiSuccess {String} _id user id.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "_id": "5afc47f1234d724bc4c90b44"
       }
 *
 * @apiError Unauthorized Token is not viable.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
        "error": "Unauthorized",
        "message": "Failed to authenticate token."
      }
 */
const me = (req, res) => {
  UserModel.findById(req.userId)
    .select('email')
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
 * @api {get} /auth/logout Log the user out
 * @apiName LogoutUser
 * @apiGroup User
 * *   
 * @apiSuccess {null} token Always returns null.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "token": null
}
 */
const logout = (req, res) => {
  res.status(200).send({ token: null });
};

module.exports = {
  login,
  register,
  logout,
  me
};
