import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useAuthStore } from '../store/store'
import TabPanel from '../components/TabPanel'
import PatientListPanel from '../components/Panels/PatientListPanel'
import AddPatientPanel from '../components/Panels/AddPatientPanel'
import PatientRecapPanel from '../components/Panels/PatientRecapPanel'
import UserListPanel from '../components/Panels/UserListPanel'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const user = useAuthStore((state) => state.user)

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      {/* @ts-expect-error - error in typing */}
      {user?.role === 'RELATIVE' || user?.role === 'PATIENT' ? (
        <>
          <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
            <Tab label={t('dashboard.panel.recap')} />
            <Tab
              label={
                user?.role === 'PATIENT'
                  ? t('dashboard.panel.patient.relations')
                  : t('dashboard.panel.relative.relations')
              }
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <PatientRecapPanel />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserListPanel />
          </TabPanel>
        </>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
              <Tab label={t('dashboard.panel.patients')} />
              {/* @ts-expect-error - error in typing */}
              {user?.role === 'DOCTOR' && (
                <Tab label={t('dashboard.panel.addPatient')} />
              )}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PatientListPanel />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddPatientPanel />
          </TabPanel>
        </>
      )}
    </Box>
  )
}

export default DashboardPage
