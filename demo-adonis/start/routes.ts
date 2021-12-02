import Route from '@ioc:Adonis/Core/Route'

Route.post('/store', 'StoresController.sell')

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