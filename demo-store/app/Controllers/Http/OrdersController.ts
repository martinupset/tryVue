// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

import Database from '@ioc:Adonis/Lucid/Database'
import { sendLock } from 'App/rabbitMq/lock'


export default class OrdersController {
  async index({ request, response }) {
    const {cartData, userId} = request.body()
    console.log(cartData, userId)
      cartData.forEach(async (item) => {
        await Database.transaction(async (trx) => {
        const order = new Order()
        order.productId = item.id
        order.number = item.number
        order.userId = userId
        await sendLock(item, userId)
        order.useTransaction(trx)
        await order.save()
        })   
      })
    // cartData.forEach(async (item) => {
    // const product = await Product.findOrFail(item.id)
    // if(parseInt(item.stock) === 0){
    //   product.stock = 'sell out'
    // }else{
    //   product.stock = item.stock
    // }
    // await product.save()
    // })
    // cartData.forEach((item) => {
    //   result = result + item.name + item.number + '件' + ';'
    // })
    // const stockTime = new Date().toLocaleDateString()
    // const appendFileData = stockTime + ':' + result + "\n"
    // writeLogs(appendFileData)

    // return result
  }
}
