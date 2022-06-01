import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WargaMailsController {
  public async index({ view }: HttpContextContract) {
    return view.render('warga/mail/history')
  }

  public async create({ view }: HttpContextContract) {
    return view.render('warga/mail/new')
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
