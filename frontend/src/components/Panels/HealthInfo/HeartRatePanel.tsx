import { Box } from '@mui/material'
import { User } from '../../../types/types'
import LineChart from '../../Charts/LineChart'
import { heartRateMock } from '../../../api/mocks/health'
import { useTranslation } from 'react-i18next'

type HeartRatePanelProps = {
  patient: User
}

const HeartRatePanel: React.FC<HeartRatePanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  console.log(patient)

  const heartRatesData = heartRateMock('2023-01-01', 365)

  return (
    <Box>
      <LineChart
        data={heartRatesData}
        lines={[{ name: 'heartRate', color: '#cd5454' }]}
        unit={t('patientHealthPanel.heartRatePanel.unit')}
      />
    </Box>
  )
}

export default HeartRatePanel
