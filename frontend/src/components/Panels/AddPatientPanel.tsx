import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { users } from '../../api/users'
import { useAuthStore } from '../../store/store'
import PatientCard from '../PatientCard'
import { getMyPatients, linkPatient } from '../../api/relations'
import AddPatientModal from '../Modals/AddPatientModal'
import { User } from '../../types/types'

const AddPatientPanel: React.FC = () => {
  const { t } = useTranslation()
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null)

  const { data: patients, isLoading: isLoadingPatients } = useQuery({
    queryKey: ['users-patients', user?.id],
    queryFn: () => users({ limit: 100, role: 'PATIENT' }),
  })

  const { data: nurses } = useQuery({
    queryKey: ['users-nurses', user?.id],
    queryFn: () => users({ limit: 100, role: 'NURSE' }),
  })

  const { data: relatives } = useQuery({
    queryKey: ['users-relatives', user?.id],
    queryFn: () => users({ limit: 100, role: 'RELATIVE' }),
  })

  const { data: myPatients, isLoading: isLoadingMyPatients } = useQuery({
    queryKey: ['patients', user?.id],
    queryFn: () => getMyPatients({ id: user?.id }),
  })

  const linkPatientMutation = useMutation({
    mutationFn: linkPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'patients',
      })
    },
  })

  const myPatientsIds = myPatients?.map((patient) => patient?.user?.id)

  const newPatients = patients?.filter(
    (patient) => !myPatientsIds?.includes(patient?.id)
  )

  const handleAddPatient = (
    patientId: number,
    nurseId: number,
    relativeId: number
  ) => {
    linkPatientMutation.mutate({
      patientId,
      relatedUserId: user?.id,
      // @ts-expect-error - error in typing
      relationType: 'DOCTOR',
    })

    linkPatientMutation.mutate({
      patientId,
      relatedUserId: nurseId,
      // @ts-expect-error - error in typing
      relationType: 'NURSE',
    })

    linkPatientMutation.mutate({
      patientId,
      relatedUserId: relativeId,
      // @ts-expect-error - error in typing
      relationType: 'RELATIVE',
    })
    setIsOpen(false)
    setIsSnackbarOpen(true)
  }

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          marginBottom: 2,
        }}
      >
        {t('addPatientPanel.title')}
      </Typography>
      {isLoadingPatients && isLoadingMyPatients ? (
        <CircularProgress />
      ) : newPatients?.length ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {newPatients?.map((patient) => (
            <PatientCard
              key={patient?.id}
              name={`${patient?.firstName} ${patient?.lastName}`}
              actionButtonProps={{
                onClick: () => {
                  console.log('click')
                  setIsOpen(true)
                  setSelectedPatient(patient)
                },
                children: t('addPatientPanel.add'),
              }}
            />
          ))}
        </Box>
      ) : (
        <Typography>{t('addPatientPanel.noPatients')}</Typography>
      )}

      <AddPatientModal
        title={t('addPatientPanel.title')}
        open={isOpen}
        closeButtonProps={{
          onClick: () => setIsOpen(false),
        }}
        handleClose={() => setIsOpen(false)}
        patient={selectedPatient}
        nurses={nurses}
        relatives={relatives}
        onAddPatient={handleAddPatient}
      />

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {t('addPatientPanel.success')}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AddPatientPanel
