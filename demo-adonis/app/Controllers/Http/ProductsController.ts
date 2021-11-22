import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product'

export default class ProductsController {
    public async index(ctx: HttpContextContract) {
        return Product.all() //select * from products
    }

    public async store({ request, response }: HttpContextContract) {
        const newProductSchema = schema.create({
            name: schema.string({trim: true}),
            description: schema.string({trim: true}),
            price: schema.string({trim: true}),
            stock: schema.string()
        });

        const payload = await request.validate({ schema: newProductSchema })
        

        const product = await Product.create(payload) //create instance and save in one go

        response.status(201)

        return product
    }

    public async show({params}: HttpContextContract) {
        return Product.findOrFail(params.id)
    }

    public async update({params, request}: HttpContextContract) {
        const body = request.body()

        const product = await Product.findOrFail(params.id)

        product.name = body.name

        return product.save()
    }

    public async destroy({params}: HttpContextContract) {
        const product = await Product.findOrFail(params.id)

        await product.delete()

        return product
    }
}
