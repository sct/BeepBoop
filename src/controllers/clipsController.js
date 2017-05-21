import Clip from '../models/Clip';

export const getAllClips = (req, res, next) => {
  Clip.find((err, clips) => {
    if (err) {
      return next(err);
    }

    return res.status(200).json(clips);
  });
}

export const createClip = (req, res, next) => {
  return res.status(200).json({ message: "do create here" });
}