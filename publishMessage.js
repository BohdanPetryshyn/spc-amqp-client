const { MESSAGE_EXCHANGE_NAME } = require('./index');

module.exports = channel => message => {
  const messageBuffer = new Buffer(JSON.stringify(message));
  channel.publish(MESSAGE_EXCHANGE_NAME, '', messageBuffer);
};
