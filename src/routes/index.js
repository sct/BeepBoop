import {
  version
} from '../../package.json';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    name: "BeepBoopAPI",
    version,
  });
})

export default router;