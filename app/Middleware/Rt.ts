import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Rt {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await auth.use('web').authenticate()
    if(auth.use('web').user!.level == "RT") {
      await next()
    } else {
      response.redirect().back()
    }
  }
}
