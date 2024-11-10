import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'

import BarChart from '../../Charts/BarChart'
import { LocalUser } from '../../../types/user'
import RangePicker from '../../RangePicker'

dayjs.extend(minMax)
dayjs.extend(isBetween)

type SleepPacePanelProps = {
  patient: LocalUser
}

const SleepPacePanel: React.FC<SleepPacePanelProps> = ({ patient }) => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-11-09'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-11-09'))

  const sleepPaceData = useMemo(() => {
    return Object.entries(patient.sleepPaces || {})
      .map(([date, records]) => ({
        label: date,
        lightSlowSleep: ((records.lightSlowSleep || 0) / 60).toFixed(2),
        deepSlowSleep: ((records.deepSlowSleep || 0) / 60).toFixed(2),
        deepSlowParadoxSleep: (
          (records.deepSlowParadoxSleep || 0) / 60
        ).toFixed(2),
        paradoxSleep: ((records.paradoxSleep || 0) / 60).toFixed(2),
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())
  }, [patient.sleepPaces])

  const dataToShow = useMemo(() => {
    if (!startDate || !endDate) return []

    const adjustedStart = dayjs.max(
      startDate,
      dayjs(sleepPaceData[sleepPaceData.length - 1]?.label)
    )
    const adjustedEnd = dayjs.min(endDate, dayjs(sleepPaceData[0]?.label))

    if (adjustedEnd.isBefore(adjustedStart)) return []

    return sleepPaceData
      .filter((record) => {
        const recordDate = dayjs(record.label)
        return recordDate.isBetween(adjustedStart, adjustedEnd, 'day', '[]')
      })
      .map((record) => ({
        ...record,
        label: dayjs(record.label).format('DD/MM'),
      }))
      .reverse()
  }, [sleepPaceData, startDate, endDate])

  return (
    <Box>
      <RangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <BarChart
        data={dataToShow}
        bars={[
          { name: 'lightSlowSleep', color: '#cd5454', stackId: 'a' },
          { name: 'deepSlowSleep', color: '#ff9f00', stackId: 'a' },
          { name: 'deepSlowParadoxSleep', color: '#00b7c2', stackId: 'a' },
          { name: 'paradoxSleep', color: '#ff97fc', stackId: 'a' },
        ]}
        unit={t('patientHealthPanel.sleepPacePanel.unit')}
      />
    </Box>
  )
}

export default SleepPacePanel
