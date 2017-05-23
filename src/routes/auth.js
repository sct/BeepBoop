import express from 'express';

import passport, { scope } from '../core/passport';
import { loginUser } from '../controllers/usersController';

const router = express.Router();

router.get('/discord', passport.authenticate('discord', { scope, session: false }));
router.get('/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/',
  session: false,
}), loginUser);

export default router;