import express from 'express';
import expressJwt from 'express-jwt';

import { auth as authConfig } from '../config';
import {
  version
} from '../../package.json';
import clips from './clips';
import auth from './auth';
import servers from './servers';

const router = express.Router();
const authenticated = expressJwt({ secret: authConfig.jwtSecret, credentialsRequired: false });

router.use(authenticated);

router.use('/auth', auth);
router.use('/clip', clips);
router.use('/server', servers);

router.get('/', (req, res) => {
  return res.status(200).json({
    name: "BeepBoopAPI",
    version,
  });
});

export default router;