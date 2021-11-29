import Route from '@ioc:Adonis/Core/Route'
import Product from 'App/Models/Product'
import {writeLogs} from 'App/Logs/fileSystem'

Route.post('/store', async ({ request, response }) => {
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
})

Route.get('/flow/:flowId', async ({ params, request, response }) => {
  response.status(200)
  return params.flowId + '号订单已准备就绪'
})

//GET /products
Route.group(() => {
  Route.resource('/products', 'ProductsController').apiOnly()
}).middleware('auth')

Route.resource('/users', 'UsersController').apiOnly()

Route.post('/register', 'AuthController.register')

Route.post('/login', 'AuthController.login')