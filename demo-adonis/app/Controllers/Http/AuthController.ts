import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    public async register({request, response}: HttpContextContract) {
        const validations = await schema.create({
            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email'})
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ])
        })

        const data = await request.validate({schema: validations})

        const user = await User.create(data)
        return response.created(user)
    }

    public async login({request, response, auth}: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.attempt(email, password)
        let id
        if(token){
            const user = await User.findByOrFail('email', email)
            id = user.id
        }
        response.status(200)
        return {...token.toJSON(), id}
    }
}
