import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class JenisSurat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kode_surat: string

  @column()
  public jenis_surat: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
