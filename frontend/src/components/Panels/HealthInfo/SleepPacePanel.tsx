import { Box } from '@mui/material'
import { User } from '../../../types/types'
import { sleepPaceMock } from '../../../api/mocks/health'
import { useTranslation } from 'react-i18next'
import BarChart from '../../Charts/BarChart'

type SleepPacePanelProps = {
  patient: User
}

const SleepPacePanel: React.FC<SleepPacePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  console.log(patient)

  const sleepPaceData = sleepPaceMock('2023-01-01', 365)

  return (
    <Box>
      <BarChart
        data={sleepPaceData}
        bars={[
          { name: 'lightSlowSleep', color: '#cd5454', stackId: 'a' },
          { name: 'deepSlowSleep', color: '#ff9f00', stackId: 'a' },
          { name: 'deepSlowParadoxSleep', color: '#00b7c2', stackId: 'a' },
          { name: 'paradoxSleep', color: '#ff97fc', stackId: 'a' },
        ]}
        unit={t('patientHealthPanel.sleepPacePanel.unit')}
      />
    </Box>
  )
}

export default SleepPacePanel
