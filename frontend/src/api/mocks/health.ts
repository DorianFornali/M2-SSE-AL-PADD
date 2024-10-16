import { MultiValue } from '../../components/Charts/types'

export const heartRateMock = (
  startDate: string,
  numDays: number = 365
): MultiValue[] => {
  const heartRateData = []
  const start = new Date(startDate)

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    heartRateData.push({
      label: currentDate.toISOString().split('T')[0] || '',
      heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
    })
  }

  return heartRateData
}

export const bloodPressureMock = (
  startDate: string,
  numDays: number = 365
): MultiValue[] => {
  const bloodPressureData: MultiValue[] = []
  const start = new Date(startDate)

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    bloodPressureData.push({
      label: currentDate.toISOString().split('T')[0] || '',
      systolic: Math.floor(Math.random() * (140 - 90 + 1)) + 90,
      diastolic: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    })
  }

  return bloodPressureData
}

export const stressLevelMock = (
  startDate: string,
  numDays: number = 365
): MultiValue[] => {
  const stressLevelData: MultiValue[] = []
  const start = new Date(startDate)

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    stressLevelData.push({
      label: currentDate.toISOString().split('T')[0] || '',
      stressLevel: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    })
  }

  return stressLevelData
}

export const bloodOxygenationMock = (
  startDate: string,
  numDays: number = 365
): MultiValue[] => {
  const oxygenationData: MultiValue[] = []
  const start = new Date(startDate)

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    oxygenationData.push({
      label: currentDate.toISOString().split('T')[0] || '',
      oxygenation: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
    })
  }

  return oxygenationData
}

export const sleepPaceMock = (
  startDate: string,
  numDays: number = 365
): MultiValue[] => {
  const sleepPaceData: MultiValue[] = []
  const start = new Date(startDate)

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    sleepPaceData.push({
      label: currentDate.toISOString().split('T')[0] || '',
      lightSlowSleep: Math.floor(Math.random() * (120 - 30 + 1)) + 30,
      deepSlowSleep: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
      deepSlowParadoxSleep: Math.floor(Math.random() * (90 - 15 + 1)) + 15,
      paradoxSleep: Math.floor(Math.random() * (80 - 10 + 1)) + 10,
    })
  }

  return sleepPaceData
}

export const bodyTemperatureMock = (
  startDate: string,
  numDays: number = 365
): MultiValue[] => {
  const bodyTemperatureData: MultiValue[] = []
  const start = new Date(startDate)

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    bodyTemperatureData.push({
      label: currentDate.toISOString().split('T')[0] || '',
      bodyTemperature: Math.random() * (37.5 - 36.0) + 36.0,
    })
  }

  return bodyTemperatureData
}
