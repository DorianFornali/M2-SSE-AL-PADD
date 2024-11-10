import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LineChart from '../../Charts/LineChart'
import { LocalUser } from '../../../types/user'
import { useMemo, useState } from 'react'

type BodyTemperaturePanelProps = {
  patient: LocalUser
}

const BodyTemperaturePanel: React.FC<BodyTemperaturePanelProps> = ({
  patient,
}) => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('1w')

  const bodyTemperatureData = useMemo(() => {
    const healthRecords = Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        bodyTemperature:
          records.reduce(
            (sum, record) => sum + (record.bodyTemperature || 0),
            0
          ) / records.length,
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

    return bodyTemperatureData.slice(0, daysToShow)
  }, [bodyTemperatureData, period])

  return (
    <Box>
      <LineChart
        data={dataToShow}
        lines={[{ name: 'bodyTemperature', color: '#66e5ff' }]}
        unit={t('patientHealthPanel.bodyTemperaturePanel.unit')}
        period={period}
        handlePeriod={handlePeriod}
      />
    </Box>
  )
}

export default BodyTemperaturePanel
