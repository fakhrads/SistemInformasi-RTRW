import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nama', 150).notNullable()
      table.string('email', 255).notNullable()
      table.integer('telpon', 14).notNullable()
      table.string('password', 180).notNullable()
      table.string('tempat_lahir', 50).nullable()
      table.date('tanggal_lahir').nullable()
      table.string('pendidikan', 100).nullable()
      table.enu('agama', ['Islam', 'Katolik', 'Protestan','Hindu','Buddha',]).notNullable()
      table.enu('status_pernikahan', ['Kawin','Lajang']).nullable()
      table.enu('kewarganegaraan', ['WNI','WNA']).notNullable()
      table.integer('nik', 250).nullable()
      table.string('alamat', 255).nullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
