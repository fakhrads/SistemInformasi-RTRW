import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Surat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_pembuat: number

  @column()
  public jenis_surat: string

  @column()
  public penandatangan: string

  @column()
  public status: string

  @column()
  public keterangan: string

  @column()
  public path_download: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
