import { Box, Button, CircularProgress, Tab, Tabs } from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { userViewQuery } from '../../config/query'
import { routes } from '../../router/definitions'
import { useState } from 'react'
import TabPanel from '../../components/TabPanel'
import UserInformationPanel from '../../components/Panels/UserInformationPanel'
import PatientHealthPanel from '../../components/Panels/PatientHealthPanel'

const UserViewPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams({
    strict: false,
  })
  const userViewQueryOptions = userViewQuery(id ?? '')
  const { data, isLoading } = useSuspenseQuery(userViewQueryOptions)
  const [value, setValue] = useState(0)

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
            {/* @ts-expect-error - error in typing */}
            {data?.role === 'PATIENT' && <Tab label="Informations de santé" />}
          </Tabs>
          <TabPanel value={value} index={0}>
            <UserInformationPanel patient={data} />
          </TabPanel>
          {/* @ts-expect-error - error in typing */}
          {data?.role === 'PATIENT' && (
            <TabPanel value={value} index={1}>
              <PatientHealthPanel patient={data} />
            </TabPanel>
          )}
        </>
      )}
    </Box>
  )
}

export default UserViewPage
