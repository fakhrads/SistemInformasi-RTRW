import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'surats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.bigInteger('id_pembuat').notNullable()
      table.string('jenis_surat').notNullable()
      table.string('penandatangan').notNullable()
      table.string('keterangan').notNullable()
      table.string('status').defaultTo('Waiting').notNullable()
      table.string('path_download').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
