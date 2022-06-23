import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Surat from 'App/Models/Surat'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import fs from 'fs';
import path from 'path';
import Docxtemplater  from 'docxtemplater';
import PizZip  from 'pizzip';

// Load the docx file as binary content
const content = fs.readFileSync(
  path.resolve("template_surat/", "sk.docx"),
  "binary"
);

const zip = new PizZip(content);
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});

export default class MailController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await Surat.all()
    console.log(data)

    return view.render('admin/mail/index', { data: data })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async approve({auth, response, request}: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.input('id')
    const data_surat = await Surat.find(id)
    const data_user = await User.find(data_surat?.id)
    const d = new Date();

    doc.render({
      tahun: d.getFullYear(),
      kode_surat: data_surat?.kode_jenis,
      nama: data_user?.nama,
      jenis_kelamin: "Laki Laki",
      status_perkawinan: data_user?.status_pernikahan,
      agama: data_user?.agama,
      ktp: data_user?.nik,
      kk: "0123091250783011390",
      alamat: data_user?.alamat,
      keterangan: data_surat?.keterangan,
    });

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });

    fs.writeFileSync(path.resolve("public/", "output.docx"), buf);

    response.redirect().back()
  }

  public async edit({ view, auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const sid = request.param('id')
    const data = await Surat.findOrFail(sid)
    const users = await User.findOrFail(data.id_pembuat)

    return view.render('admin/mail/edit', { data:data, users:users })
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
