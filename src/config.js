import fs from 'fs';
import dotenv from 'dotenv';

if (fs.existsSync('.env')) {
  dotenv.config();
}

export const port = process.env.PORT || 3000;

export const config = {
  port: process.env.PORT || 3000,
  logging: process.env.LOGGING || true,
  loggingLevel: process.env.LOGGING_LEVEL || 'debug',
  uploadDirectory: process.env.UPLOAD_DIRECTORY || 'clipsTemp/',
  clipDirectory: process.env.CLIP_DIRECTORY || 'clips/',
};

export const botConfig = {
  token: process.env.BOT_TOKEN,
};

export const db = {
  host: 'localhost',
  name: 'beepboop',
};

export const auth = {
  jwksUri: process.env.AUTH_JWKS_URI,
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
};