// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import {writeLogs} from 'App/Logs/fileSystem'


export default class StoresController {
    async sell({request, response}){
        let result = '已发货'
        const cartData = request.body()
        cartData.forEach(async (item) => {
            const product = await Product.findOrFail(item.id)
            if(parseInt(item.stock) === 0){
              product.stock = 'sell out'
            }else{
              product.stock = item.stock
            }
            await product.save()
        })
        cartData.forEach((item) => {
          result = result + item.name + item.number + '件' + ';'
        })
        const stockTime = new Date().toLocaleDateString()
        const appendFileData = stockTime + ':' + result + "\n"
        writeLogs(appendFileData)

        return result
    }
}