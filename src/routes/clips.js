import express from 'express';
import multer from 'multer';

import { config } from '../config';
import {
  getAllClips, createClip, getClip,
  uploadClip, playClip,
} from '../controllers/clipsController';
import { isAuthenticated } from '../controllers/usersController';

const router = express.Router();
const upload = multer({ dest: config.uploadDirectory });

router.get('/', isAuthenticated, getAllClips);
router.post('/', isAuthenticated, createClip);

router.get('/:clip', isAuthenticated, getClip);
router.get('/:clip/play', isAuthenticated, playClip);
router.post('/:clip/upload', isAuthenticated, upload.single('clip'), uploadClip);

export default router;
