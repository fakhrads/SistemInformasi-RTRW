import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    return view.render('admin/users/index')
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/users/add')
  }

  public async store({ view, request }: HttpContextContract) {
    const nama = request.input('nama')
    const email = request.input('email')
    const password = request.input('password')
    const tempat_lahir = request.input('tempat_lahir')
    const tanggal_lahir = request.input('tanggal_lahir')
    const pendidikan = request.input('pendidikan')
    const agama = request.input('agama')
    const status_pernikahan = request.input('status_pernikahan')
    const kewarganegaraan = request.input('kewarganegaraan')
    const nik = request.input('nik')
    const alamat = request.input('alamat')

    await User.create({
      nama: nama,
      email: email,
      tempat_lahir: tempat_lahir,
      password: password,
      tanggal_lahir: tanggal_lahir,
      pendidikan: pendidikan,
      agama: agama,
      status_pernikahan: status_pernikahan,
      kewarganegaraan: kewarganegaraan,
      nik: nik,
      alamat: alamat
    })
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view }: HttpContextContract) {
    return view.render('admin/users/edit')
  }

  public async auth({ request, auth, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      await response.redirect().toRoute('/dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
