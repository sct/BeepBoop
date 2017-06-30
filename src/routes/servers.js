import express from 'express';

import { config } from '../config';
import {
  getServer, joinServer, finishJoinServer,
} from '../controllers/serversController';
import { isAuthenticated } from '../controllers/usersController';

const router = express.Router();

router.get('/callback', finishJoinServer);

router.get('/:server', isAuthenticated, getServer);
router.get('/:server/join', joinServer);

export default router;
