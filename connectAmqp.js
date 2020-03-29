const amqplib = require('amqplib');

const RETRY_TIME = 1000;

const connectAmqp = host => {
  return new Promise(resolve => {
    amqplib
      .connect(host)
      .then(connection => {
        console.log(`Connected to AMQP broker at host ${host}`);
        resolve(connection);
      })
      .catch(() => {
        console.error(
          `Connection to AMQP broker at host ${host} failed. Retrying.`
        );
        setTimeout(() => connectAmqp(host).then(resolve), RETRY_TIME);
      });
  });
};
