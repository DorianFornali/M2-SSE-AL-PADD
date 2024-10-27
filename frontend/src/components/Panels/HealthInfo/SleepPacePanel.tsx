import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BarChart from '../../Charts/BarChart'
import { LocalUser } from '../../../types/user'

type SleepPacePanelProps = {
  patient: LocalUser
}

const SleepPacePanel: React.FC<SleepPacePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  // const sleepPaceData = sleepPaceMock('2023-01-01', 365)

  const sleepPaceData = patient.healthData.map((data) => ({
    label: data.timestamp,
    lightSlowSleep: data.sleepPace.lightSlowSleep,
    deepSlowSleep: data.sleepPace.deepSlowSleep,
    deepSlowParadoxSleep: data.sleepPace.deepSlowParadoxSleep,
    paradoxSleep: data.sleepPace.paradoxSleep,
  }))

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
