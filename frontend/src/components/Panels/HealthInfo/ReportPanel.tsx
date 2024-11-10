import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LocalUser } from '../../../types/user'
import ReportCard from '../../ReportCard'

type ReportPanelProps = {
  patient: LocalUser
}

const ReportPanel: React.FC<ReportPanelProps> = (props) => {
  const { patient } = props
  const { t } = useTranslation()

  const reports = patient.healthReports

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {reports && reports.length > 0 ? (
        reports.map((report) => (
          <Box key={report.id}>
            <ReportCard report={report} />
          </Box>
        ))
      ) : (
        <Box>{t('patientHealthPanel.reportPanel.noData')}</Box>
      )}
    </Box>
  )
}

export default ReportPanel
