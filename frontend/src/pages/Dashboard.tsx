import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useAuthStore } from '../store/store'
import HealthCard from '../components/HealthCard'
import TabPanel from '../components/TabPanel'
import PatientPanel from '../components/Panels/PatientPanel'

const DashboardPage = () => {
  const [value, setValue] = useState(0)
  const user = useAuthStore((state) => state.user)

  console.log(user)

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      {user?.role === "'RELATIVE'" || user?.role === "'PATIENT'" ? (
        <>
          <h1>Recap</h1>
          <HealthCard name="John Doe" healthStatus="bad" />
        </>
      ) : (
        <>
          <Box
            className="AccountSelector"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
              <Tab label="Mes patients" />
              <Tab label="Ajouter un patient" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PatientPanel />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <p>Ajouter un patient</p>
          </TabPanel>
        </>
      )}
    </Box>
  )
}

export default DashboardPage
