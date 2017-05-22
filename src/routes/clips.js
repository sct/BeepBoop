import express from 'express';
import multer from 'multer';

import { config } from '../config';
import {
  getAllClips, createClip, getClip,
  uploadClip, playClip,
} from '../controllers/clipsController';

const router = express.Router();
const upload = multer({ dest: config.uploadDirectory });

router.get('/', getAllClips);
router.post('/', createClip);

router.get('/:clip', getClip);
router.get('/:clip/play', playClip);
router.post('/:clip/upload', upload.single('clip'), uploadClip);

export default router;
