import { Box } from '@mui/material'
import { User } from '../../../types/types'
import { useTranslation } from 'react-i18next'
import { stressLevelMock } from '../../../api/mocks/health'
import LineChart from '../../Charts/LineChart'

type StressLevelPanelProps = {
  patient: User
}

const StressLevelPanel: React.FC<StressLevelPanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  console.log(patient)

  const stressLevelData = stressLevelMock('2023-01-01', 365)

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
