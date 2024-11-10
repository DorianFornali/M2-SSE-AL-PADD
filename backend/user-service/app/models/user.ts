import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UserRelation from './user_relation.js'
import HealthRecord from './health_record.js'
import SleepPace from './sleep_pace.js'
import HealthReport from './health_report.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare phoneNumber: string | null

  @column()
  declare address: string | null

  @column()
  declare birthDate: string | null

  @column()
  // @enum('PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN')
  declare role: string

  @hasMany(() => UserRelation, {
    foreignKey: 'relatedUserId',
    onQuery: (query) =>
      query
        .where('relation_type', 'DOCTOR')
        .orWhere('relation_type', 'NURSE')
        .orWhere('relation_type', 'RELATIVE'),
  })
  declare patients: HasMany<typeof UserRelation>

  @hasMany(() => UserRelation, {
    foreignKey: 'userId',
    onQuery: (query) => query.where('relation_type', 'DOCTOR'),
  })
  declare doctor: HasMany<typeof UserRelation>

  @hasMany(() => UserRelation, {
    foreignKey: 'userId',
    onQuery: (query) => query.where('relation_type', 'NURSE'),
  })
  declare nurse: HasMany<typeof UserRelation>

  @hasMany(() => UserRelation, {
    foreignKey: 'userId',
    onQuery: (query) => query.where('relation_type', 'RELATIVE'),
  })
  declare relatives: HasMany<typeof UserRelation>

  @hasMany(() => HealthRecord, {
    foreignKey: 'userId',
  })
  declare healthRecords: HasMany<typeof HealthRecord>

  @hasMany(() => SleepPace, {
    foreignKey: 'userId',
  })
  declare sleepPaces: HasMany<typeof SleepPace>

  @hasMany(() => HealthReport, {
    foreignKey: 'userId',
  })
  declare healthReports: HasMany<typeof HealthReport>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
