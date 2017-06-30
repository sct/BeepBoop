import fs from 'fs';
import dotenv from 'dotenv';

if (fs.existsSync('.env')) {
  dotenv.config();
}

export const config = {
  port: process.env.PORT || 3005,
  logging: process.env.LOGGING || true,
  loggingLevel: process.env.LOGGING_LEVEL || 'debug',
  uploadDirectory: process.env.UPLOAD_DIRECTORY || 'clipsTemp/',
  clipDirectory: process.env.CLIP_DIRECTORY || 'clips/',
};

export const botConfig = {
  token: process.env.BOT_TOKEN,
};

export const db = {
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME || 'beepboop',
};

export const auth = {
  clientId: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackUrl: process.env.AUTH_CALLBACK_URL,
  authorizeUrl: process.env.AUTH_AUTHORIZE_URL || 'https://discordapp.com/oauth2/authorize',
  tokenUrl: process.env.AUTH_TOKEN_URL || 'https://discordapp.com/api/oauth2/token',
  joinRedirectUrl: process.env.AUTH_JOIN_REDIRECT_URL || 'http://localhost:3005/server/callback',
  jwtSecret: process.env.AUTH_JWT_SECRET || 'secret cat',
  redirectUrl: process.env.AUTH_REDIRECT_URL || 'http://localhost:3000/login',
  serverRedirectUrl: process.env.AUTH_REDIRECT_URL || 'http://localhost:3000/servers/',
};