import { HealthRecord, SleepPace, User } from './types'

export type LocalUser = Omit<User, 'sleepPaces' | 'healthRecords'> & {
  healthRecords: {
    [key: string]: HealthRecord[]
  }
  sleepPaces: {
    [key: string]: SleepPace
  }
}
