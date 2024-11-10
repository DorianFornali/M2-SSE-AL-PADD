import React from 'react'
import { Card, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { HealthReport } from '../types/types'

type ReportCardProps = {
  report: HealthReport
}

const ReportCard: React.FC<ReportCardProps> = (props) => {
  const { report } = props

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h6">
          Rapport du{' '}
          {new Date(report?.startTimestamp || '').toLocaleDateString()} au{' '}
          {new Date(report?.endTimestamp || '').toLocaleDateString()}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 2,
          }}
        >
          <Typography variant="h6">
            <strong>Moyenne de la fréquence cardiaque: </strong>
            {report.averageHeartRate} bpm
          </Typography>
          <Typography variant="h6">
            <strong>Stress moyen: </strong>
            {report.averageStressLevel}
          </Typography>
          <Typography variant="h6">
            <strong>Heures de sommeil: </strong>
            {report.totalSleepDuration} heures de sommeil
          </Typography>
        </Card>
      </AccordionDetails>
    </Accordion>
  )
}

export default ReportCard
