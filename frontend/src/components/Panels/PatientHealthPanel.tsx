import { Box } from '@mui/material'
import { User } from '../../types/types'

type PatientHealthPanelProps = {
  patient: User
}

const PatientHealthPanel: React.FC<PatientHealthPanelProps> = (props) => {
  const { patient } = props

  console.log(patient)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      health information
    </Box>
  )
}

export default PatientHealthPanel
