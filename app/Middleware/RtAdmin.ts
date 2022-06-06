import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RtAdmin {
  public async handle({response, auth}: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').authenticate()
    if(auth.use('web').user!.level == "Admin" || auth.use('web').user!.level == "RT") {
        await next()
      } else {
        response.redirect().back()
    }
  }
}
