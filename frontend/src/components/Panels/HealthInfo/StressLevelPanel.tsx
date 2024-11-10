import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LineChart from '../../Charts/LineChart'
import { LocalUser } from '../../../types/user'
import { useMemo, useState } from 'react'

type StressLevelPanelProps = {
  patient: LocalUser
}

const StressLevelPanel: React.FC<StressLevelPanelProps> = ({ patient }) => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('1w')

  const stressLevelData = useMemo(() => {
    const healthRecords = Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        stressLevel:
          records.reduce((sum, record) => sum + (record.stressLevel || 0), 0) /
          records.length,
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())

    return healthRecords
  }, [patient.healthRecords])

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

    return stressLevelData.slice(0, daysToShow)
  }, [stressLevelData, period])

  return (
    <Box>
      <LineChart
        data={dataToShow}
        lines={[{ name: 'stressLevel', color: '#ffdd00' }]}
        unit={t('patientHealthPanel.stressLevelPanel.unit')}
        period={period}
        handlePeriod={handlePeriod}
      />
    </Box>
  )
}

export default StressLevelPanel
