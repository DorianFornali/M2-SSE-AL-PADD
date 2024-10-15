import { useQuery } from '@tanstack/react-query'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getMyPatients } from '../../api/relations'
import { useAuthStore } from '../../store/store'
import UserCard from '../UserCard'
import { useNavigate } from '@tanstack/react-router'
import { routes } from '../../router/definitions'

const PatientListPanel: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { data, isLoading } = useQuery({
    queryKey: ['patients', user?.id],
    queryFn: () => getMyPatients({ id: user?.id }),
  })

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          marginBottom: 2,
        }}
      >
        {t('patientPanel.title')}
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {data?.map((patient) => (
            <UserCard
              key={patient?.id}
              name={`${patient?.user?.firstName} ${patient?.user?.lastName}`}
              actionButtonProps={{
                onClick: () => {
                  navigate({
                    to: routes.userView.path,
                    params: { id: patient?.user?.id?.toString() },
                  })
                },
                children: t('patientPanel.see'),
              }}
            />
          ))}
        </Box>
      )}
    </>
  )
}

export default PatientListPanel
