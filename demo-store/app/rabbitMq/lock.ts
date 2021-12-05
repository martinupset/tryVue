// import Product from 'App/Models/Product'
import {channel} from './channel'

let LOCK = 'lock'


export const sendLock = (obj) => {
  channel().then(function(ch) {
    return ch.assertQueue(LOCK).then(function(ok) {
      return ch.sendToQueue(LOCK, Buffer.from('proId|userId'));
    });
  }).catch(console.warn);
}

