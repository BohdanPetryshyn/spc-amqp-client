const connectAmqp = require('./connectAmqp');
const publishMessage = require('./publishMessage');
const createMessageConsumer = require('./createMessageConsumer');

const { AMQP_MESSAGE_EXCHANGE_NAME } = require('./config');

module.exports = async host => {
  const connection = await connectAmqp(host);
  const channel = await connection.createChannel();

  await channel.assertExchange(AMQP_MESSAGE_EXCHANGE_NAME);

  return {
    publishMessage: publishMessage(channel),
    createMessageConsumer: createMessageConsumer(channel),
  };
};
