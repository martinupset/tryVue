import Product from 'App/Models/Product'
import {channel} from './channel'

let LOCK = 'lock'

channel().then(function(ch) {
  return ch.assertQueue(LOCK).then(function(ok) {
    return ch.consume(LOCK, async function(msg) {
      if (msg !== null) {
        let data = msg.content.toString()
        const [proId,lockId] = data.split('|')
        const product = await Product.findOrFail(proId)
        if(product.lockedId === lockId) {
          product.locked = true
          product.save()
          return ch.ack(msg)
        }
        return ch.nack(msg)
        console.log(msg.content.toString());
      }
    });
  });
}).catch(console.warn);
