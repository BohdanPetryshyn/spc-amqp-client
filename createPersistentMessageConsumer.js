const { AMQP_MESSAGE_EXCHANGE_NAME } = require('./config');

module.exports = channel => async (consumerName, callback) => {
  const queueName = `persistent-message-consumer-${consumerName}`;

  await channel.assertQueue(queueName);
  await channel.bindQueue(queueName, AMQP_MESSAGE_EXCHANGE_NAME);

  channel.consume(queueName, msg => {
    const message = JSON.parse(msg.content.toString());
    callback(message, () => channel.ack(msg));
  });
};
