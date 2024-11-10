import { Box } from '@mui/material'
import LineChart from '../../Charts/LineChart'
import { useTranslation } from 'react-i18next'
import { LocalUser } from '../../../types/user'
import { useMemo, useState } from 'react'

type BloodPressurePanelProps = {
  patient: LocalUser
}

const BloodPressurePanel: React.FC<BloodPressurePanelProps> = ({ patient }) => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('1w')

  const bloodPressureData = useMemo(() => {
    const healthRecords = Object.entries(patient.healthRecords || {})
      .map(([date, records]) => ({
        label: date,
        systolic:
          records.reduce(
            (sum, record) => sum + (record?.bloodPressure?.systolic || 0),
            0
          ) / records.length,
        diastolic:
          records.reduce(
            (sum, record) => sum + (record?.bloodPressure?.diastolic || 0),
            0
          ) / records.length,
      }))
      .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime()) // Sort by date descending

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

    return bloodPressureData.slice(0, daysToShow)
  }, [bloodPressureData, period])

  return (
    <Box>
      <LineChart
        data={dataToShow}
        lines={[
          { name: 'systolic', color: '#FF0000' },
          { name: 'diastolic', color: '#0000FF' },
        ]}
        unit={t('patientHealthPanel.bloodPressurePanel.unit')}
        period={period}
        handlePeriod={handlePeriod}
      />
    </Box>
  )
}

export default BloodPressurePanel
