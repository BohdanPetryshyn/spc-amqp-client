const { AMQP_MESSAGE_EXCHANGE_NAME } = require('./config');

module.exports = channel => async callback => {
  const id = Math.random();
  const queueName = `message-consumer-${id}`;

  await channel.assertQueue(queueName, { exclusive: true });
  await channel.bindQueue(queueName, AMQP_MESSAGE_EXCHANGE_NAME);

  channel.consume(queueName, msg => {
    const message = JSON.parse(msg.content.toString());
    callback(message);
  });
};
