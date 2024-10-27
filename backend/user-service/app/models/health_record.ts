import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import BloodPressure from './blood_pressure.js'
import User from './user.js'

export default class HealthRecord extends BaseModel {
  static table = 'health_record'

  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare timestamp: DateTime

  @column()
  declare bloodPressureId: number

  @hasOne(() => BloodPressure, {
    foreignKey: 'id',
    localKey: 'bloodPressureId',
  })
  declare bloodPressure: HasOne<typeof BloodPressure>

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @column()
  declare heartRate: number

  @column()
  declare stressLevel: number

  @column()
  declare bloodOxygenation: number

  @column()
  declare bodyTemperature: number

  @column()
  declare acceleration: number
}
