import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { auth } from '../config';
import User from '../models/User';

const options = { upsert: true, new: true, setDefaultsOnInsert: true };

export const loginUser = (req, res, next) => {
  User.findOneAndUpdate({ id: req.user.id }, req.user, options)
    .then(user => {
      res.status(200).json({ user: user.id, token: generateToken(user) });
    })
    .catch(e => next(e));
};

export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return next(new Error('Authorization required to access this resource'));
  }

  User.findOne({ id: req.user.id })
    .then(user => next())
    .catch(e => next(e));
}

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username,
  }, auth.jwtSecret, { expiresIn: '2h' });
}