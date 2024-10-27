import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class SleepPace extends BaseModel {
  static table = 'sleep_pace'

  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare timestamp: DateTime

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @column()
  declare sleepDuration: number

  @column()
  declare lightSlowSleep: number

  @column()
  declare deepSlowSleep: number

  @column()
  declare deepSlowParadoxSleep: number

  @column()
  declare paradoxSleep: number
}
