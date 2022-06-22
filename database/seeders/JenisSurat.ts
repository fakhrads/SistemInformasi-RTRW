import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import JenisSurat from 'App/Models/JenisSurat'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await JenisSurat.createMany([
      {
        kode_surat: 'SKD',
        jenis_surat: 'Surat Keterangan Domisili',
      },
      {
        kode_surat: 'SK',
        jenis_surat: 'Surat Keterangan',
      },
      {
        kode_surat: 'SKL',
        jenis_surat: 'Surat Kelahiran',
      },
      {
        kode_surat: 'SKM',
        jenis_surat: 'Surat Kematian',
      },
    ])
  }
}
