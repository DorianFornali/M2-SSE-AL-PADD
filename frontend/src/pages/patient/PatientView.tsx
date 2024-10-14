import { Box, Button, CircularProgress, Tab, Tabs } from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { patientViewQuery } from '../../config/query'
import { routes } from '../../router/definitions'
import { useState } from 'react'
import TabPanel from '../../components/TabPanel'
import PatientInformationPanel from '../../components/Panels/PatientInformationPanel'
import PatientHealthPanel from '../../components/Panels/PatientHealthPanel'

const PatientViewPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams({
    strict: false,
  })
  const patientViewQueryOptions = patientViewQuery(id ?? '')
  const { data, isLoading } = useSuspenseQuery(patientViewQueryOptions)
  const [value, setValue] = useState(0)

  console.log(data)

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Button
        onClick={() =>
          navigate({
            to: routes.dashboard.path,
          })
        }
      >
        Back
      </Button>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
            <Tab label="Informations personnelles" />
            <Tab label="Informations de santé" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <PatientInformationPanel patient={data} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PatientHealthPanel patient={data} />
          </TabPanel>
        </>
      )}
    </Box>
  )
}

export default PatientViewPage
