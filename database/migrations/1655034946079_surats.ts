import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'surats'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enu('kode_jenis',['SKD','SK','SKM','SKL']).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
