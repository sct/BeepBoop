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