import express from 'express';

import {
  getAllClips, createClip,
} from '../controllers/clipsController';

const router = express.Router();

router.get('/', getAllClips);

router.post('/', createClip);

export default router;
