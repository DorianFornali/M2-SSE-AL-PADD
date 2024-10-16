import { Box, CircularProgress } from '@mui/material'
import HealthCard from '../HealthCard'
import { useAuthStore } from '../../store/store'
import { useQuery } from '@tanstack/react-query'
import { getMyPatients } from '../../api/relations'

const PatientRecapPanel: React.FC = () => {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading } = useQuery({
    queryKey: ['patients', user?.id],
    queryFn: () => getMyPatients({ id: user?.id }),
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        data?.map((patient) => (
          <HealthCard
            key={patient?.id}
            name={`${patient?.user?.firstName} ${patient?.user?.lastName}`}
            healthStatus="good"
          />
        ))
      )}
    </Box>
  )
}

export default PatientRecapPanel
