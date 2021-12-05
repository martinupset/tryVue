var q = 'tasks';

const open = require('amqplib').connect('amqp://localhost');
// Publisher

export const channel = async () => {
  return (await open).createChannel()
}

open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    ch.sendToQueue(q, Buffer.from('miao'));
    ch.sendToQueue(q, Buffer.from('miao1'));
    ch.sendToQueue(q, Buffer.from('miao2'));
    ch.sendToQueue(q, Buffer.from('miao3'));
    ch.sendToQueue(q, Buffer.from('miao4'));
    ch.sendToQueue(q, Buffer.from('miao5'));
    return ch.sendToQueue(q, Buffer.from('something to do'));
  });
}).catch(console.warn);

open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    ch.sendToQueue(q, Buffer.from('miao'));
    ch.sendToQueue(q, Buffer.from('miao1'));
    ch.sendToQueue(q, Buffer.from('miao2'));
    ch.sendToQueue(q, Buffer.from('miao3'));
    ch.sendToQueue(q, Buffer.from('miao4'));
    ch.sendToQueue(q, Buffer.from('miao5'));
    return ch.sendToQueue(q, Buffer.from('something to do'));
  });
}).catch(console.warn);

// Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);
