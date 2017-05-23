import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';

import { auth } from '../config';

export const scope = ['identify', 'email', 'guilds'];

passport.use(new DiscordStrategy(
  {
    clientID: auth.clientId,
    clientSecret: auth.clientSecret,
    callbackURL: auth.callbackUrl,
    scope,
  }, (accessToken, refreshToken, profile, cb) => {
  cb(null, {
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    email: profile.email,
    guilds: profile.guilds,
    accessToken,
  });
}));

export default passport;