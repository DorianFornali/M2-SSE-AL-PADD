import { Box } from '@mui/material'
import LineChart from '../../Charts/LineChart'
import { useTranslation } from 'react-i18next'
import { LocalUser } from '../../../types/user'

type BloodPressurePanelProps = {
  patient: LocalUser
}

const BloodPressurePanel: React.FC<BloodPressurePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  // const bloodPressureData = bloodPressureMock('2023-01-01', 365)

  const bloodPressureData = patient.healthData.map((data) => ({
    label: data.timestamp,
    systolic: data.bloodPressure.systolic,
    diastolic: data.bloodPressure.diastolic,
  }))

  return (
    <Box>
      <LineChart
        data={bloodPressureData}
        lines={[
          { name: 'systolic', color: '#FF0000' },
          { name: 'diastolic', color: '#0000FF' },
        ]}
        unit={t('patientHealthPanel.bloodPressurePanel.unit')}
      />
    </Box>
  )
}

export default BloodPressurePanel
