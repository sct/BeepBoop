import log from 'winston';

export const prepareBot = bot => {
  log.info('Preparing discord bot');

  const channel = bot.channels.find('type', 'voice');
  
  channel.join()
    .then(connection => {
      log.info(`Sucessfully joined voice channel ${channel.name}`);
    })
    .catch(err => log.error(err.message));
}

export default prepareBot;