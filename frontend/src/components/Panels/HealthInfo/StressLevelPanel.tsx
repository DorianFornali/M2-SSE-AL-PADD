import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import LineChart from '../../Charts/LineChart'
import { LocalUser } from '../../../types/user'
import RangePicker from '../../RangePicker'

dayjs.extend(minMax)
dayjs.extend(isBetween)
dayjs.extend(timezone)
dayjs.extend(utc)

type StressLevelPanelProps = {
  patient: LocalUser
}

const StressLevelPanel: React.FC<StressLevelPanelProps> = ({ patient }) => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-11-09'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-11-09'))

  const stressLevelData = useMemo(() => {
    return Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        records: records.map((record) => ({
          time: record.timestamp || '00:00',
          stressLevel: record.stressLevel || 0,
        })),
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())
  }, [patient.healthRecords])

  const dataToShow = useMemo(() => {
    if (!startDate || !endDate) return []

    const adjustedStart = dayjs.max(
      startDate,
      dayjs(stressLevelData[stressLevelData.length - 1]?.label)
    )
    const adjustedEnd = dayjs.min(endDate, dayjs(stressLevelData[0]?.label))

    if (adjustedEnd.isBefore(adjustedStart)) return []

    const isSingleDay = adjustedEnd.diff(adjustedStart, 'day') === 0

    return stressLevelData
      .filter((record) => {
        const recordDate = dayjs(record.label)
        return recordDate.isBetween(adjustedStart, adjustedEnd, 'day', '[]')
      })
      .flatMap((record) => {
        if (isSingleDay) {
          return record.records.map((entry) => ({
            label: dayjs(entry.time).tz('UTC').format('HH:mm'),
            stressLevel: entry.stressLevel,
          }))
        } else {
          const avgStressLevel =
            record.records.reduce((sum, entry) => sum + entry.stressLevel, 0) /
            record.records.length
          return [
            {
              label: record.label,
              stressLevel: Math.round(avgStressLevel * 10) / 10,
            },
          ]
        }
      })
      .reverse()
  }, [stressLevelData, startDate, endDate])

  return (
    <Box>
      <RangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <LineChart
        data={dataToShow}
        lines={[{ name: 'stressLevel', color: '#ffdd00' }]}
        unit={t('patientHealthPanel.stressLevelPanel.unit')}
      />
    </Box>
  )
}

export default StressLevelPanel
