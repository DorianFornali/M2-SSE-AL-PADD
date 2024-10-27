import { User } from './types'

export type LocalUser = Omit<User, 'sleepPaces' | 'healthRecords'> & {
  healthData: {
    id: number
    timestamp: string
    heartRate: number
    stressLevel: number
    bloodOxygenation: number
    bodyTemperature: number
    acceleration: number
    bloodPressure: {
      id: number
      systolic: number
      diastolic: number
    }
    sleepPace: {
      id: number
      sleepDuration: number
      lightSlowSleep: number
      deepSlowSleep: number
      deepSlowParadoxSleep: number
      paradoxSleep: number
    }
  }[]
}
