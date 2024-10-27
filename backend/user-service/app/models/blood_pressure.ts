import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class BloodPressure extends BaseModel {
  static table = 'blood_pressure'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare systolic: number

  @column()
  declare diastolic: number
}
