import { Box } from '@mui/material'
import { User } from '../../../types/types'
import LineChart from '../../Charts/LineChart'
import { bloodOxygenationMock } from '../../../api/mocks/health'
import { useTranslation } from 'react-i18next'

type BloodOxygenationPanelProps = {
  patient: User
}

const BloodOxygenationPanel: React.FC<BloodOxygenationPanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  console.log(patient)

  const bloodOxygenationData = bloodOxygenationMock('2023-01-01', 365)

  return (
    <Box>
      <LineChart
        data={bloodOxygenationData}
        lines={[{ name: 'oxygenation', color: '#a480e8' }]}
        unit={t('patientHealthPanel.bloodOxygenationPanel.unit')}
      />
    </Box>
  )
}

export default BloodOxygenationPanel
