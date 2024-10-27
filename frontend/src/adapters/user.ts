import { User } from '../types/types'
import { LocalUser } from '../types/user'

export const transformUser = (user: User): LocalUser => {
  return {
    ...user,
    healthData:
      user?.healthRecords?.map((record) => {
        const sleepPace = user?.sleepPaces?.find(
          (sleepPace) => sleepPace.timestamp === record.timestamp
        )
        return {
          id: record.id || 0,
          timestamp: record.timestamp || '',
          heartRate: record.heartRate || 0,
          stressLevel: record.stressLevel || 0,
          bloodOxygenation: record.bloodOxygenation || 0,
          bodyTemperature: record.bodyTemperature || 0,
          acceleration: record.acceleration || 0,
          bloodPressure: {
            id: record?.bloodPressure?.id || 0,
            systolic: record?.bloodPressure?.systolic || 0,
            diastolic: record?.bloodPressure?.diastolic || 0,
          },
          sleepPace: sleepPace
            ? {
                id: sleepPace.id || 0,
                sleepDuration: sleepPace.sleepDuration || 0,
                lightSlowSleep: sleepPace.lightSlowSleep || 0,
                deepSlowSleep: sleepPace.deepSlowSleep || 0,
                deepSlowParadoxSleep: sleepPace.deepSlowParadoxSleep || 0,
                paradoxSleep: sleepPace.paradoxSleep || 0,
              }
            : {
                id: 0,
                sleepDuration: 0,
                lightSlowSleep: 0,
                deepSlowSleep: 0,
                deepSlowParadoxSleep: 0,
                paradoxSleep: 0,
              },
        }
      }) || [],
  }
}
