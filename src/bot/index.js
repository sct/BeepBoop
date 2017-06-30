import log from 'winston';

import Server from '../models/Server';

class BotController {

  prepareBot = (bot) => {
    this.bot = bot;
    log.info('Preparing discord bot');
  }

  startCoreListeners = () => {
    log.info('Starting bot event listeners...');
    this.bot.on('guildCreate', (guild) => {
      console.log(guild);
      const newGuild = {
        id: guild.id,
        name: guild.name,
      };

      console.log(newGuild);

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      Server.findOneAndUpdate({ id: guild.id }, newGuild, options)
        .then(g => log.info(`Guild Joined: ${g.name}`))
        .catch(e => log.error('Error joining guild', e));
    })
  }

  getServer = (id) => {
    const guild = this.bot.guilds.get(id);

    return guild;
  }
}

const botControl = new BotController();

export default botControl;