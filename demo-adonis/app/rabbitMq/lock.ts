import Product from 'App/Models/Product'
import {channel} from './channel'
import Database from '@ioc:Adonis/Lucid/Database'

let LOCK = 'lock'

export const receiveLock = () => {
  channel().then(function(ch) {
    return ch.assertQueue(LOCK).then(function(ok) {
      return ch.consume(LOCK, async function(msg) {
        if (msg !== null) {
          let data = msg.content.toString()
          const [proId,number,userId] = data.split('|')
          await Database.transaction(async (trx) => {
          const product = await Product.findOrFail(proId)
          if (product) {
            if(!product.locked || product.locked === undefined) {
              product.locked = true
              product.lockedId = userId
              product.save()
            }
          }
          const lockedProduct = await Product.findOrFail(proId)
          if(lockedProduct.lockedId === userId && lockedProduct.stock >= number){
            lockedProduct.stock = (parseInt(lockedProduct.stock) - number).toString()
            lockedProduct.lockedId = ''
            lockedProduct.locked = false
            lockedProduct.save()
            console.log('meow')
            return ch.ack(msg)
          }else{
            console.log('miao', msg.content.toString())
            return ch.nack(msg)
          }   
          })          
        }
      });
    });
  }).catch(console.warn);
}
