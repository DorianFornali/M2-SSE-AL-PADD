import { Box } from '@mui/material'
import LineChart from '../../Charts/LineChart'
import { useTranslation } from 'react-i18next'
import { LocalUser } from '../../../types/user'

type HeartRatePanelProps = {
  patient: LocalUser
}

const HeartRatePanel: React.FC<HeartRatePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  // const heartRatesData = heartRateMock('2023-01-01', 365)

  const heartRatesData = patient.healthData.map((data) => ({
    label: data.timestamp,
    heartRate: data.heartRate,
  }))

  return (
    <Box>
      <LineChart
        data={heartRatesData}
        lines={[{ name: 'heartRate', color: '#cd5454' }]}
        unit={t('patientHealthPanel.heartRatePanel.unit')}
      />
    </Box>
  )
}

export default HeartRatePanel
