import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'

import LineChart from '../../Charts/LineChart'
import { LocalUser } from '../../../types/user'
import RangePicker from '../../RangePicker'

dayjs.extend(minMax)
dayjs.extend(isBetween)

type BodyTemperaturePanelProps = {
  patient: LocalUser
}

const BodyTemperaturePanel: React.FC<BodyTemperaturePanelProps> = ({
  patient,
}) => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-11-09'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-11-09'))

  const bodyTemperatureData = useMemo(() => {
    return Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        records: records.map((record) => ({
          time: record.timestamp || '00:00',
          bodyTemperature: record.bodyTemperature || 0,
        })),
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())
  }, [patient.healthRecords])

  const dataToShow = useMemo(() => {
    if (!startDate || !endDate) return []

    const adjustedStart = dayjs.max(
      startDate,
      dayjs(bodyTemperatureData[bodyTemperatureData.length - 1]?.label)
    )
    const adjustedEnd = dayjs.min(endDate, dayjs(bodyTemperatureData[0]?.label))

    if (adjustedEnd.isBefore(adjustedStart)) return []

    const isSingleDay = adjustedEnd.diff(adjustedStart, 'day') === 0

    return bodyTemperatureData
      .filter((record) => {
        const recordDate = dayjs(record.label)
        return recordDate.isBetween(adjustedStart, adjustedEnd, 'day', '[]')
      })
      .flatMap((record) => {
        if (isSingleDay) {
          return record.records.map((entry) => ({
            label: dayjs(entry.time).format('HH:mm'),
            bodyTemperature: entry.bodyTemperature,
          }))
        } else {
          const avgTemperature =
            record.records.reduce(
              (sum, entry) => sum + entry.bodyTemperature,
              0
            ) / record.records.length
          return [
            {
              label: record.label,
              bodyTemperature: Math.round(avgTemperature * 10) / 10,
            },
          ]
        }
      })
      .reverse()
  }, [bodyTemperatureData, startDate, endDate])

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
        lines={[{ name: 'bodyTemperature', color: '#66e5ff' }]}
        unit={t('patientHealthPanel.bodyTemperaturePanel.unit')}
      />
    </Box>
  )
}

export default BodyTemperaturePanel
