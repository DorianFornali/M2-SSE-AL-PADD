import { Box } from '@mui/material'
import LineChart from '../../Charts/LineChart'
import { useTranslation } from 'react-i18next'
import { LocalUser } from '../../../types/user'

type BodyTemperaturePanelProps = {
  patient: LocalUser
}

const BodyTemperaturePanel: React.FC<BodyTemperaturePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  // const bodyTemperatureData = bodyTemperatureMock('2023-01-01', 365)

  const bodyTemperatureData = patient.healthData.map((data) => ({
    label: data.timestamp,
    bodyTemperature: data.bodyTemperature,
  }))

  return (
    <Box>
      <LineChart
        data={bodyTemperatureData}
        lines={[{ name: 'bodyTemperature', color: '#66e5ff' }]}
        unit={t('patientHealthPanel.bodyTemperaturePanel.unit')}
      />
    </Box>
  )
}

export default BodyTemperaturePanel
