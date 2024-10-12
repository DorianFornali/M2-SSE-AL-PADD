import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { ROLES } from '../enums/roles.js'
import UserRelation from './user_relation.js'

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
  declare role: ROLES

  @hasMany(() => UserRelation, {
    foreignKey: 'relatedUserId',
    onQuery: (query) =>
      query
        .where('relation_type', ROLES.DOCTOR)
        .orWhere('relation_type', ROLES.NURSE)
        .orWhere('relation_type', ROLES.RELATIVE),
  })
  declare patients: HasMany<typeof UserRelation>

  @hasMany(() => UserRelation, {
    foreignKey: 'userId',
    onQuery: (query) => query.where('relation_type', ROLES.DOCTOR),
  })
  declare doctor: HasMany<typeof UserRelation>

  @hasMany(() => UserRelation, {
    foreignKey: 'userId',
    onQuery: (query) => query.where('relation_type', ROLES.NURSE),
  })
  declare nurse: HasMany<typeof UserRelation>

  @hasMany(() => UserRelation, {
    foreignKey: 'userId',
    onQuery: (query) => query.where('relation_type', ROLES.RELATIVE),
  })
  declare relatives: HasMany<typeof UserRelation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
