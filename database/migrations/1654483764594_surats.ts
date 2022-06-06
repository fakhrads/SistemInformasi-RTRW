import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'surats'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('nomor_surat', 250).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
