import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Surat from 'App/Models/Surat'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import fs from 'fs';
import Docxtemplater  from 'docxtemplater';
import JSZip  from 'jszip';

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
    const users = await User.findOrFail(data.id_pembuat)

    return view.render('admin/mail/edit', { data:data, users:users })
  }

  public async createSKD({ auth, response }: HttpContextContract) {
    await auth.use('web').authenticate()

    const file_surat = fs
      .readFileSync(__dirname+"../../../template_surat/skd.docx","binary");

    const zip = new JSZip(file_surat);
    const doc = new Docxtemplater().loadZip(zip);  

    

    doc.setData({
      "firstname":"John",
      "lastname":"Doe"
  });

  }

  public async update({ auth, request, response }: HttpContextContract) {
    await auth.use('web').authenticate()

    const status = request.input('status')
    const surat = await Surat.findOrFail(request.input('id_surat'))
    const nomor_surat = request.input('nomor_surat')
    const file_surat = request.file('file_surat',{
      size: '10mb',
      extnames: ['pdf'],
    })

    if (file_surat) {
      await file_surat.move(Application.tmpPath('uploads'))
      const url = await Drive.getUrl(file_surat?.clientName)
      

      surat.status = status 
      surat.nomor_surat = nomor_surat
      surat.path_download = url

      surat.save()

      response.redirect().back()
      
    } else {
      
      surat.status = status 
      surat.nomor_surat = nomor_surat

      surat.save()

      response.redirect().back()
      
    }

  }

  public async destroy({}: HttpContextContract) {}
}
