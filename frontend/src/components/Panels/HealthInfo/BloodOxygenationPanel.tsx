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

type BloodOxygenationPanelProps = {
  patient: LocalUser
}

const BloodOxygenationPanel: React.FC<BloodOxygenationPanelProps> = ({
  patient,
}) => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-11-09'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-11-09'))

  const bloodOxygenationData = useMemo(() => {
    return Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        records: records.map((record) => ({
          time: record.timestamp || '00:00',
          oxygenation: record.bloodOxygenation || 0,
        })),
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())
  }, [patient.healthRecords])

  const dataToShow = useMemo(() => {
    if (!startDate || !endDate) return []

    const adjustedStart = dayjs.max(
      startDate,
      dayjs(bloodOxygenationData[bloodOxygenationData.length - 1]?.label)
    )
    const adjustedEnd = dayjs.min(
      endDate,
      dayjs(bloodOxygenationData[0]?.label)
    )

    if (adjustedEnd.isBefore(adjustedStart)) return []

    const isSingleDay = adjustedEnd.diff(adjustedStart, 'day') === 0

    return bloodOxygenationData
      .filter((record) => {
        const recordDate = dayjs(record.label)
        return recordDate.isBetween(adjustedStart, adjustedEnd, 'day', '[]')
      })
      .flatMap((record) => {
        if (isSingleDay) {
          return record.records.map((entry) => ({
            label: dayjs(entry.time).format('HH:mm'),
            oxygenation: entry.oxygenation,
          }))
        } else {
          const avgOxygenation =
            record.records.reduce((sum, entry) => sum + entry.oxygenation, 0) /
            record.records.length
          return [
            {
              label: record.label,
              oxygenation: Math.round(avgOxygenation),
            },
          ]
        }
      })
      .reverse()
  }, [bloodOxygenationData, startDate, endDate])

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
        lines={[{ name: 'oxygenation', color: '#a480e8' }]}
        unit={t('patientHealthPanel.bloodOxygenationPanel.unit')}
      />
    </Box>
  )
}

export default BloodOxygenationPanel
