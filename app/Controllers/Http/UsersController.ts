import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    return view.render('admin/users/index')
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({ view }: HttpContextContract) {
    return view.render('admin/users/edit')
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
