// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Product from 'App/Models/Product'
import { writeLogs } from 'App/Logs/fileSystem'
import { receiveLock } from 'App/rabbitMq/lock'

export default class StoresController {
  async sell({ request, response }) {
    let result = '已发货'
    const {cartData} = request.body()
    await receiveLock()
    cartData.forEach((item) => {
      result = result + item.name + item.number + '件' + ';'
    })
    const stockTime = new Date().toLocaleDateString()
    const appendFileData = stockTime + ':' + result + "\n"
    writeLogs(appendFileData)

    return result
  }
}
