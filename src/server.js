import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import log from 'winston';
import Discord from 'discord.js';

import {
  config,
  db,
  botConfig
} from './config';
import routes from './routes';
import BotController from './bot';
import passport from './core/passport';

const app = express();
const bot = new Discord.Client();
export const botControl = new BotController(bot);

app.server = http.createServer(app);

// Setup Logging
log.level = config.loggingLevel;
app.use(morgan('dev'));

app.use(bodyParser.json());

// Configure Auth (Passport)
app.use(passport.initialize());

// Connect to Database
try {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://${db.host}/${db.name}`, err => {
    if (err) {
      throw new Error(err)
    } else {
      log.info(`Connected to database [${db.name}] @ ${db.host}`);
    }
  });
} catch (err) {
  log.error(err.message);
}

// Connect to Discord
bot.on('ready', () => {
  log.info('Bot is connected to Discord');
  botControl.prepareBot();
});

bot.login(botConfig.token);

// Load routing
app.use('/', routes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    next(err);
  }
});

app.server.listen(process.env.PORT || config.port);

log.info(`Started on port ${app.server.address().port}`);

export default app;