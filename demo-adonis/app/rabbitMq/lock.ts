import Product from 'App/Models/Product'
import {channel} from './channel'

let LOCK = 'lock'

export const receiveLock = () => {
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
            console.log('meow',msg.content.toString());
            return ch.ack(msg)
          }
          console.log('miao',msg.content.toString());
          return ch.nack(msg)       
        }
      });
    });
  }).catch(console.warn);
}
