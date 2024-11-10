import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LineChart from '../../Charts/LineChart'
import { LocalUser } from '../../../types/user'
import { useMemo, useState } from 'react'

type BloodOxygenationPanelProps = {
  patient: LocalUser
}

const BloodOxygenationPanel: React.FC<BloodOxygenationPanelProps> = ({
  patient,
}) => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('1w')

  const bloodOxygenationData = useMemo(() => {
    const healthRecords = Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        oxygenation:
          records.reduce(
            (sum, record) => sum + (record.bloodOxygenation || 0),
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

    return bloodOxygenationData.slice(0, daysToShow)
  }, [bloodOxygenationData, period])

  return (
    <Box>
      <LineChart
        data={dataToShow}
        lines={[{ name: 'oxygenation', color: '#a480e8' }]}
        unit={t('patientHealthPanel.bloodOxygenationPanel.unit')}
        period={period}
        handlePeriod={handlePeriod}
      />
    </Box>
  )
}

export default BloodOxygenationPanel
