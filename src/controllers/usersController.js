import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { auth } from '../config';
import User from '../models/User';

const options = { upsert: true, new: true, setDefaultsOnInsert: true };

export const getUser = (req, res, next) => {
  return res.status(200).json(sanitizeUser(req.user));
}

export const loginUser = (req, res, next) => {
  User.findOneAndUpdate({ id: req.user.id }, req.user, options)
    .then(user => {
      const expiresAt = Date.now() + (1000 * 60 * 60 * 2);
      res.redirect(`${auth.redirectUrl}?id=${user.id}&token=${generateToken(user)}&expiresAt=${expiresAt}`);
    })
    .catch(e => next(e));
};

export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return next(new Error('Authorization required to access this resource'));
  }

  User.findOne({ id: req.user.id })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(e => next(e));
}

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username,
  }, auth.jwtSecret, { expiresIn: '2h' });
}

const sanitizeUser = (user) => {
  const blacklistedFields = ['accessToken'];

  const sanitized = {};

  Object.keys(user).forEach((key) => {
    if (!blacklistedFields.includes(key)) {
      sanitized[key] = user[key];
    }
  });

  return user;
}