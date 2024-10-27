import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import TabPanel from '../TabPanel'
import { useTranslation } from 'react-i18next'
import HeartRatePanel from './HealthInfo/HeartRatePanel'
import BloodPressurePanel from './HealthInfo/BloodPressurePanel'
import StressLevelPanel from './HealthInfo/StressLevelPanel'
import BloodOxygenationPanel from './HealthInfo/BloodOxygenationPanel'
import SleepPacePanel from './HealthInfo/SleepPacePanel'
import BodyTemperaturePanel from './HealthInfo/BodyTemperaturePanel'
import { LocalUser } from '../../types/user'

type PatientHealthPanelProps = {
  patient: LocalUser
}

const PatientHealthPanel: React.FC<PatientHealthPanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  console.log(patient)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
        <Tab label={t('patientHealthPanel.heartRatePanel.title')} />
        <Tab label={t('patientHealthPanel.bloodPressurePanel.title')} />
        <Tab label={t('patientHealthPanel.stressLevelPanel.title')} />
        <Tab label={t('patientHealthPanel.bloodOxygenationPanel.title')} />
        <Tab label={t('patientHealthPanel.sleepPacePanel.title')} />
        <Tab label={t('patientHealthPanel.bodyTemperaturePanel.title')} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <HeartRatePanel patient={patient} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BloodPressurePanel patient={patient} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StressLevelPanel patient={patient} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BloodOxygenationPanel patient={patient} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SleepPacePanel patient={patient} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <BodyTemperaturePanel patient={patient} />
      </TabPanel>
    </Box>
  )
}

export default PatientHealthPanel
