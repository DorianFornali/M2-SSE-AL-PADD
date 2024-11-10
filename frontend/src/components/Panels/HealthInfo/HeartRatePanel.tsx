import { Box } from '@mui/material'
import LineChart from '../../Charts/LineChart'
import { useTranslation } from 'react-i18next'
import { LocalUser } from '../../../types/user'
import { useMemo, useState } from 'react'

type HeartRatePanelProps = {
  patient: LocalUser
}

const HeartRatePanel: React.FC<HeartRatePanelProps> = ({ patient }) => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('1w')

  const heartRatesData = useMemo(() => {
    const healthRecords = Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        heartRate:
          records.reduce((sum, record) => sum + (record.heartRate || 0), 0) /
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

    return heartRatesData.slice(0, daysToShow)
  }, [heartRatesData, period])

  return (
    <Box>
      <LineChart
        data={dataToShow}
        lines={[{ name: 'heartRate', color: '#cd5454' }]}
        unit={t('patientHealthPanel.heartRatePanel.unit')}
        period={period}
        handlePeriod={handlePeriod}
      />
    </Box>
  )
}

export default HeartRatePanel
