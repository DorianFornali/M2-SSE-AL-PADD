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

  @column({ columnName: 'average_body_temperature' })
  declare averageBodyTemperature: number

  @column({ columnName: 'max_body_temperature' })
  declare maxBodyTemperature: number

  @column({ columnName: 'min_body_temperature' })
  declare minBodyTemperature: number

  @column({ columnName: 'average_blood_oxygenation' })
  declare averageBloodOxygenation: number

  @column({ columnName: 'max_blood_oxygenation' })
  declare maxBloodOxygenation: number

  @column({ columnName: 'min_blood_oxygenation' })
  declare minBloodOxygenation: number

  @column({ columnName: 'max_heart_rate' })
  declare maxHeartRate: number

  @column({ columnName: 'min_heart_rate' })
  declare minHeartRate: number

  @column({ columnName: 'max_stress_level' })
  declare maxStressLevel: number

  @column({ columnName: 'min_stress_level' })
  declare minStressLevel: number

  @column({ columnName: 'max_sleep_duration' })
  declare maxSleepDuration: number

  @column({ columnName: 'min_sleep_duration' })
  declare minSleepDuration: number

  @column({ columnName: 'general_state' })
  declare generalState: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
