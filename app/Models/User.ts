import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string
  
  @column()
  public nama: string

  @column()
  public tempat_lahir: string

  @column.dateTime()
  public tanggal_lahir: DateTime

  @column()
  public pendidikan: string

  @column()
  public level: string

  @column()
  public pekerjaan: string

  @column()
  public agama: string

  @column()
  public status_pernikahan: string

  @column()
  public kewarganegaraan: string

  @column()
  public nik: number

  @column()
  public telpon: number

  @column()
  public alamat: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
