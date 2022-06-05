import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = User.all()
    return view.render('admin/users/index', { data: data })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/users/add')
  }

  public async store({ request }: HttpContextContract) {
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
    const telpon = request.input('telpon')

    await User.create({
      nama: nama,
      email: email,
      telpon: telpon,
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

  public async registerPost({ request, response }: HttpContextContract ) {
    const nama = request.input('nama')
    const email = request.input('email')
    const telpon = request.input('telpon')
    const password = request.input('password')
    const kewarganegaraan = request.input('kewarganegaraan')
    console.log(request.input('password'))

    await User.create({
      nama: nama,
      email: email,
      telpon: telpon,
      password: password,
      kewarganegaraan: kewarganegaraan,
    })

    return response.redirect().back()
  }

  public async register({ view }: HttpContextContract ) {
    return view.render('auth/register')
  }

  public async login({ view }: HttpContextContract ) {
    return view.render('auth/login')
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view }: HttpContextContract) {
    return view.render('admin/users/edit')
  }

  public async loginPost({ request, auth, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    console.log(request)

    
      // Lookup user manually
      const user = await User
      .query()
      .where('email', email)
      .firstOrFail()

        // Verify password
      if (!(await Hash.verify(user.password, password))) {
        return await Hash.verify(user.password, password)
      }
      
      await auth.use('web').login(user)

      await response.redirect().toRoute('/dashboard')
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
