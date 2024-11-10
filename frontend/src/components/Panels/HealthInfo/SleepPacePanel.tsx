import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BarChart from '../../Charts/BarChart'
import { LocalUser } from '../../../types/user'
import { useMemo, useState } from 'react'

type SleepPacePanelProps = {
  patient: LocalUser
}

const SleepPacePanel: React.FC<SleepPacePanelProps> = ({ patient }) => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('1w')

  const sleepPaceData = useMemo(() => {
    const healthRecords = Object.entries(patient.sleepPaces || {})
      .map(([date, records]) => ({
        label: date,
        lightSlowSleep: ((records.lightSlowSleep || 0) / 60).toFixed(1),
        deepSlowSleep: ((records.deepSlowSleep || 0) / 60).toFixed(1),
        deepSlowParadoxSleep: (
          (records.deepSlowParadoxSleep || 0) / 60
        ).toFixed(1),
        paradoxSleep: ((records.paradoxSleep || 0) / 60).toFixed(1),
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())

    return healthRecords
  }, [patient.sleepPaces])

  const handlePeriod = (_: unknown, newTime: string) => {
    setPeriod(newTime)
  }

  const dataToShow = useMemo(() => {
    const daysToShow =
      {
        '1w': 7,
        '1m': 30,
        '3m': 90,
        '6m': 180,
        '1y': 365,
      }[period] || 365

    return sleepPaceData.slice(0, daysToShow)
  }, [sleepPaceData, period])

  return (
    <Box>
      <BarChart
        data={dataToShow}
        bars={[
          { name: 'lightSlowSleep', color: '#cd5454', stackId: 'a' },
          { name: 'deepSlowSleep', color: '#ff9f00', stackId: 'a' },
          { name: 'deepSlowParadoxSleep', color: '#00b7c2', stackId: 'a' },
          { name: 'paradoxSleep', color: '#ff97fc', stackId: 'a' },
        ]}
        unit={t('patientHealthPanel.sleepPacePanel.unit')}
        period={period}
        handlePeriod={handlePeriod}
      />
    </Box>
  )
}

export default SleepPacePanel
