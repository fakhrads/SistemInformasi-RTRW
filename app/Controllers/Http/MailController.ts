import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Surat from 'App/Models/Surat'

export default class MailController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await Surat.all()
    console.log(data)

    return view.render('admin/mail/index', { data: data })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({ view, auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const sid = request.param('id')
    const data = await Surat.findOrFail(sid)

    return view.render('admin/mail/edit', { data:data })
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
