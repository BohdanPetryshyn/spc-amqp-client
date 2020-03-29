const amqplib = require('amqplib');

const publishMessage = require('./publishMessage');

const MESSAGE_EXCHANGE_NAME = 'spc-message-exchange';

module.exports = async host => {
  const connection = await amqplib.connect(host);
  const channel = await connection.createChannel();

  await channel.assertExchange(MESSAGE_EXCHANGE_NAME);

  return {
    publishMessage: publishMessage(channel),
  };
};

exports.MESSAGE_EXCHANGE_NAME = MESSAGE_EXCHANGE_NAME;
