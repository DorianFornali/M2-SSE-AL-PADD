import { useQuery } from '@tanstack/react-query'
import { getPatients } from '../../api/relations'
import { useAuthStore } from '../../store/store'
import { Box, CircularProgress, Typography } from '@mui/material'
import PatientCard from '../PatientCard'

const PatientPanel: React.FC = () => {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading } = useQuery({
    queryKey: ['patients', user?.id],
    queryFn: () => getPatients({ id: user?.id }),
  })

  console.log(data)

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          marginBottom: 2,
        }}
      >
        Patient Panel
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
            <PatientCard
              key={patient?.id}
              name={`${patient?.user?.firstName} ${patient?.user?.lastName}`}
            />
          ))}
        </Box>
      )}
    </>
  )
}

export default PatientPanel
