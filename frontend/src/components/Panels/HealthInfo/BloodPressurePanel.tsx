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

type BloodPressurePanelProps = {
  patient: LocalUser
}

const BloodPressurePanel: React.FC<BloodPressurePanelProps> = ({ patient }) => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-11-09'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-11-09'))

  const bloodPressureData = useMemo(() => {
    return Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        records: records.map((record) => ({
          time: record.timestamp || '00:00',
          systolic: record?.bloodPressure?.systolic || 0,
          diastolic: record?.bloodPressure?.diastolic || 0,
        })),
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())
  }, [patient.healthRecords])

  const dataToShow = useMemo(() => {
    if (!startDate || !endDate) return []

    const adjustedStart = dayjs.max(
      startDate,
      dayjs(bloodPressureData[bloodPressureData.length - 1]?.label)
    )
    const adjustedEnd = dayjs.min(endDate, dayjs(bloodPressureData[0]?.label))

    if (adjustedEnd.isBefore(adjustedStart)) return []

    const isSingleDay = adjustedEnd.diff(adjustedStart, 'day') === 0

    return bloodPressureData
      .filter((record) => {
        const recordDate = dayjs(record.label)
        return recordDate.isBetween(adjustedStart, adjustedEnd, 'day', '[]')
      })
      .flatMap((record) => {
        if (isSingleDay) {
          return record.records.map((entry) => ({
            label: dayjs(entry.time).format('HH:mm'),
            systolic: entry.systolic,
            diastolic: entry.diastolic,
          }))
        } else {
          const avgSystolic =
            record.records.reduce((sum, entry) => sum + entry.systolic, 0) /
            record.records.length
          const avgDiastolic =
            record.records.reduce((sum, entry) => sum + entry.diastolic, 0) /
            record.records.length
          return [
            {
              label: record.label,
              systolic: Math.round(avgSystolic),
              diastolic: Math.round(avgDiastolic),
            },
          ]
        }
      })
      .reverse()
  }, [bloodPressureData, startDate, endDate])

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
        lines={[
          { name: 'systolic', color: '#FF0000' },
          { name: 'diastolic', color: '#0000FF' },
        ]}
        unit={t('patientHealthPanel.bloodPressurePanel.unit')}
      />
    </Box>
  )
}

export default BloodPressurePanel
