import log from 'winston';

class BotController {

  constructor(bot) {
    this.bot = bot;
    this.connection = null;
  }

  prepareBot = () => {
    log.info('Preparing discord bot');

    const channel = this.bot.channels.find('type', 'voice');
    
    channel.join()
      .then(connection => {
        log.info(`Sucessfully joined voice channel ${channel.name}`);
        this.connection = connection;
      })
      .catch(err => log.error(err.message));
  }
}

export default BotController;