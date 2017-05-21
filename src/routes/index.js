import express from 'express';

import {
  version
} from '../../package.json';
import clips from './clips';

const router = express.Router();

router.use('/clip', clips);

router.get('/', (req, res) => {
  return res.status(200).json({
    name: "BeepBoopAPI",
    version,
  });
})

export default router;