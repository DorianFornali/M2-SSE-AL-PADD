import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LineChart from '../../Charts/LineChart'
import { LocalUser } from '../../../types/user'

type StressLevelPanelProps = {
  patient: LocalUser
}

const StressLevelPanel: React.FC<StressLevelPanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  // const stressLevelData = stressLevelMock('2023-01-01', 365)

  const stressLevelData = patient.healthData.map((data) => ({
    label: data.timestamp,
    stressLevel: data.stressLevel,
  }))

  return (
    <Box>
      <LineChart
        data={stressLevelData}
        lines={[{ name: 'stressLevel', color: '#ffdd00' }]}
        unit={t('patientHealthPanel.stressLevelPanel.unit')}
      />
    </Box>
  )
}

export default StressLevelPanel
