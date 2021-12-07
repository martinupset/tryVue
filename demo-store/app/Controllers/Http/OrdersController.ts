// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import { writeLogs } from 'App/Logs/fileSystem'
import Database from '@ioc:Adonis/Lucid/Database'
import { sendLock } from 'App/rabbitMq/lock'


export default class OrdersController {
  async index({ request, response }) {
    console.log('miao')
    const cartData = request.body()
    console.log(cartData)
      cartData.forEach(async (item) => {
        const order = new Order()
        order.productId = item.id
        order.number = item.number
        await sendLock(item)
        await order.save()
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
