const open = require('amqplib').connect('amqp://localhost');
// Publisher

export const channel = async () => {
  return (await open).createChannel()
}