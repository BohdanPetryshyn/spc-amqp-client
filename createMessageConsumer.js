const { MESSAGE_EXCHANGE_NAME } = require('./index');

module.exports = channel => async callback => {
  const id = Math.random();
  const queueName = `message-consumer-${id}`;

  await channel.assertQueue(queueName, { exclusive: true });
  await channel.bindQueue(queueName, 'spc-message-exchange');

  channel.consume(queueName, msg => {
    const message = JSON.parse(msg.content.toString());
    callback(message);
  });
};
