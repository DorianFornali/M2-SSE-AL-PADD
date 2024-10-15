import { Box } from '@mui/material'
import { User } from '../../../types/types'
import LineChart from '../../Charts/LineChart'
import { bodyTemperatureMock } from '../../../api/mocks/health'
import { useTranslation } from 'react-i18next'

type BodyTemperaturePanelProps = {
  patient: User
}

const BodyTemperaturePanel: React.FC<BodyTemperaturePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  console.log(patient)

  const bodyTemperatureData = bodyTemperatureMock('2023-01-01', 365)

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
