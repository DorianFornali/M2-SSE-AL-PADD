import { SleepPace, User } from '../types/types'
import { LocalUser } from '../types/user'

export const transformUser = (user: User): LocalUser => {
  const healthRecords: { [key: string]: User['healthRecords'] } = {}

  user?.healthRecords?.forEach((record) => {
    const date = new Date(record?.timestamp || '')
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const isoDate = day.toLocaleDateString('en-CA') || ''
    healthRecords[isoDate] = healthRecords[isoDate] || []
    healthRecords[isoDate].push(record!)
  })

  const sleepPaces: { [key: string]: SleepPace } = {}
  user?.sleepPaces?.forEach((record) => {
    const date = new Date(record?.timestamp || '')
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const isoDate = day.toLocaleDateString('en-CA') || ''
    sleepPaces[isoDate] = record!
  })

  return {
    ...user,
    // @ts-expect-error - healthRecords is not defined in the OpenAPI schema
    healthRecords,
    sleepPaces,
  }
}
