import { Box, Button, Typography } from '@mui/material'
import { User } from '../../types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unlinkPatient } from '../../api/relations'
import { useAuthStore } from '../../store/store'
import { useNavigate } from '@tanstack/react-router'
import { routes } from '../../router/definitions'

type PatientInformationPanelProps = {
  patient: User
}

const PatientInformationPanel: React.FC<PatientInformationPanelProps> = (
  props
) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const { patient } = props

  const unlinkPatientMutation = useMutation({
    mutationFn: unlinkPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'patients',
      })
      navigate({
        to: routes.dashboard.path,
      })
    },
  })

  const onUnlinkPatient = () => {
    unlinkPatientMutation.mutate({
      patientId: patient.id,
      relatedUserId: user?.id,
      // @ts-expect-error - error in typing
      relationType: user?.role,
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h3">
        {patient?.firstName} {patient?.lastName}
      </Typography>
      <Typography variant="h6">
        <strong>Email : </strong>
        {patient?.email}
      </Typography>
      <Typography variant="h6">
        <strong>Phone : </strong>
        {patient?.phoneNumber}
      </Typography>
      <Typography variant="h6">
        <strong>Address : </strong>
        {patient?.address}
      </Typography>
      <Typography variant="h6">
        <strong>Birth date : </strong>
        {patient?.birthDate}
      </Typography>
      <Button
        variant="contained"
        color="error"
        sx={{
          width: 'fit-content',
        }}
        onClick={onUnlinkPatient}
      >
        Délier le patient
      </Button>
    </Box>
  )
}

export default PatientInformationPanel
