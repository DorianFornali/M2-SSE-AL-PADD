import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('full_name')
      table.string('first_name').nullable().after('email')
      table.string('last_name').nullable().after('first_name')
      table.string('phone_number').nullable().after('last_name')
      table.string('address').nullable().after('phone_number')
      table.string('birth_date').nullable().after('address')
      table
        .enu('role', ['PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN'], {
          useNative: true,
          enumName: 'users_role',
          existingType: false,
        })
        .defaultTo('PATIENT')
        .after('birth_date')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('full_name').nullable().after('email')
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('phone_number')
      table.dropColumn('address')
      table.dropColumn('birth_date')
      table.dropColumn('role')
    })
    this.schema.raw('DROP TYPE IF EXISTS "users_role"')
  }
}
