import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Surat from 'App/Models/Surat'

export default class WargaMailsController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await Surat
                  .query()
                  .select('*')
                  .where('id_pembuat', auth.use("web").user!.id)
    console.log(data)
    return view.render('warga/mail/history', { data: data })
  }

  public async create({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    return view.render('warga/mail/new')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    await auth.use('web').authenticate()
    const jenis_surat = request.input('jenis_surat')
    const penandatangan = request.input('penandatangan')
    const keterangan = request.input('keterangan')

    try {
      await Surat.create({
        id_pembuat: auth.use('web').user!.id,
        jenis_surat: jenis_surat,
        penandatangan: penandatangan,
        keterangan: keterangan
      })

      response.redirect().back()
    } catch (error) {
      response.badRequest("Gagal Membuat Surat")
      
    }
  }

  public async show({ view, auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await Surat.findOrFail(request.param('id'))

    return view. render('warga/mail/edit', {data:data})

  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
