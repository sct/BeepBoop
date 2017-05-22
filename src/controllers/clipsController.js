import fs from 'fs';
import mime from 'mime';

import { config } from '../config';
import Clip from '../models/Clip';
import { botControl } from '../server';

const getClipDB = (id) =>
  new Promise((resolve, reject) => {
    Clip.findOne({
        _id: id
      })
      .then(clip => resolve(clip))
      .catch(e => reject(e));
  });

const updateClipDB = (id, params) =>
  new Promise((resolve, reject) => {
    Clip.findOneAndUpdate({
        _id: id
      }, params)
      .then(clip => resolve(clip))
      .catch(e => reject(e));
  });

export const getAllClips = (req, res, next) => {
  Clip.find((err, clips) => {
    if (err) {
      return next(err);
    }

    return res.status(200).json(clips);
  });
}

export const getClip = (req, res, next) => {
  getClipDB(req.params.clip)
    .then(clip => res.status(200).json(clip))
    .catch(e => next(e));
}

export const createClip = (req, res, next) => {
  Clip.create(req.body, (err, clip) => {
    if (err) return next(err);

    return res.status(200).json(clip);
  });
}

export const uploadClip = (req, res, next) => {
  getClipDB(req.params.clip)
    .then(clip => {
      if (!fs.existsSync(config.clipDirectory)) {
        fs.mkdirSync(config.clipDirectory);
      }

      const newFile = `${config.clipDirectory}${clip._id}.${mime.extension(req.file.mimetype)}`;

      fs.rename(req.file.path, newFile, err => {
          if (err) {
            next(err);
          } else {
            clip.filename = newFile;

            clip.save((err, newClip) => {
              if (err) {
                next(err);
              } else {
                res.status(200).json(newClip);
              }
            });
          }
      });
    })
    .catch(e => next(e));
}

export const playClip = (req, res, next) => {
  getClipDB(req.params.clip)
    .then(clip => {
      if (!clip.filename) {
        return next(new Error('No clip available to play'));
      }

      botControl.connection.playFile(clip.filename);
      res.status(200).json({ status: "Request for clip playback sent" });
    })
    .catch(e => next(e));
}