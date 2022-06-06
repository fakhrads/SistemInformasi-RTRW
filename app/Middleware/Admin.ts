import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').authenticate()
    if(auth.use('web').user!.level == "Admin") {
      await next()
    } else {
      response.redirect().back()
    }
  }
}
