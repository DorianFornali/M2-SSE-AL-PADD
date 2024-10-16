import { Box } from '@mui/material'
import { User } from '../../../types/types'
import { bloodPressureMock } from '../../../api/mocks/health'
import LineChart from '../../Charts/LineChart'
import { useTranslation } from 'react-i18next'

type BloodPressurePanelProps = {
  patient: User
}

const BloodPressurePanel: React.FC<BloodPressurePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  console.log(patient)

  const bloodPressureData = bloodPressureMock('2023-01-01', 365)

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
