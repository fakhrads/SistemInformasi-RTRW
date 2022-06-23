import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await User.all()
    console.log(data)
    return view.render('admin/users/index', { data: data })
  }

  public async create({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    return view.render('admin/users/add')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    await auth.use('web').authenticate()
    
    const nama = request.input('nama')
    const email = request.input('email')
    const password = request.input('password')
    const tempat_lahir = request.input('tempat_lahir')
    const tanggal_lahir = request.input('tanggal_lahir')
    const pendidikan = request.input('pendidikan')
    const pekerjaan = request.input('pekerjaan')
    const agama = request.input('agama')
    const status_pernikahan = request.input('status_pernikahan')
    const kewarganegaraan = request.input('kewarganegaraan')
    const nik = request.input('nik')
    const kk = request.input('kk')
    const alamat = request.input('alamat')
    const telpon = request.input('telpon')

    try {
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
        kk: kk,
        alamat: alamat,
        pekerjaan: pekerjaan
      })
    } catch (error) {
      return response.badRequest('Something bad happened')
    }
    
  }

  public async registerPost({ request, response }: HttpContextContract ) {
    const nama = request.input('nama')
    const email = request.input('email')
    const telpon = request.input('telpon')
    const nik = request.input('nik')
    const kk = request.input('kk')
    const password = request.input('password')
    const kewarganegaraan = request.input('kewarganegaraan')
    console.log(request.input('password'))

    await User.create({
      nama: nama,
      email: email,
      telpon: telpon,
      nik: nik,
      kk: kk,
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


  public async edit({ view, request, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const uid = request.param('id')
    const users = await User.findOrFail(uid)

    return view.render('admin/users/edit', { data: users })
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

  public async update({ request, auth, response  }: HttpContextContract) {
    await auth.use('web').authenticate()
    
    const uid = request.input('id')

    try {
      const user = await User.findOrFail(uid)

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
      const pekerjaan = request.input('pekerjaan')

      user.nama = nama
      user.email = email
      user.password = password
      user.tempat_lahir = tempat_lahir
      user.tanggal_lahir = tanggal_lahir
      user.pendidikan = pendidikan
      user.agama = agama
      user.status_pernikahan = status_pernikahan
      user.kewarganegaraan = kewarganegaraan
      user.nik = nik
      user.alamat = alamat
      user.telpon = telpon
      user.pekerjaan = pekerjaan

      await user.save()
      response.redirect().back()
    } catch (error) {
      response.badRequest('Something bad happened')
    }
  }

  public async destroy({ request, auth, response }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.input('uid')

    const user = await User.findOrFail(id)

    await user.delete()

    response.redirect().back()
  }

  public async show({ auth, view }: HttpContextContract) {
    await auth.use("web").authenticate()

    const id = auth.use('web').user!.id
    const dad =  await User.findOrFail(id)

    return view.render('warga/user/edit', { data: dad })
  }
}
