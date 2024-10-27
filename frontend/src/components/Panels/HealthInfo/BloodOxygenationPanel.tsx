import { Box } from '@mui/material'
import LineChart from '../../Charts/LineChart'
import { useTranslation } from 'react-i18next'
import { LocalUser } from '../../../types/user'

type BloodOxygenationPanelProps = {
  patient: LocalUser
}

const BloodOxygenationPanel: React.FC<BloodOxygenationPanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  // const bloodOxygenationData = bloodOxygenationMock('2023-01-01', 365)

  const bloodOxygenationData = patient.healthData.map((data) => ({
    label: data.timestamp,
    oxygenation: data.bloodOxygenation,
  }))

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
