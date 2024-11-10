import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class HealthReport extends BaseModel {
  static table = 'health_report'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ columnName: 'start_timestamp' })
  declare startTimestamp: DateTime

  @column.dateTime({ columnName: 'end_timestamp' })
  declare endTimestamp: DateTime

  @column({ columnName: 'average_heart_rate' })
  declare averageHeartRate: number

  @column({ columnName: 'total_sleep_duration' })
  declare totalSleepDuration: number

  @column({ columnName: 'average_stress_level' })
  declare averageStressLevel: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
