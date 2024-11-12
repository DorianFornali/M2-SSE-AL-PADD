import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { HealthReport } from '../types/types'

type ReportCardProps = {
  report: HealthReport
}

const ReportCard: React.FC<ReportCardProps> = (props) => {
  const { report } = props

  const { t } = useTranslation()

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
          <Typography variant="h5">
            <strong>État de santé général : </strong>
            {t(`generalState.${report.generalState}`)}
          </Typography>

          <Typography variant="h5">
            <strong>Fréquence cardiaque</strong>
          </Typography>
          <Box>
            <Typography variant="h6">
              <strong>Minimum: </strong>
              {report.minHeartRate}
            </Typography>
            <Typography variant="h6">
              <strong>Moyenne: </strong>
              {report.averageHeartRate?.toFixed(0)}
            </Typography>
            <Typography variant="h6">
              <strong>Maximum: </strong>
              {report.maxHeartRate}
            </Typography>
          </Box>

          <Typography variant="h5">
            <strong>Oxygénation du sang</strong>
          </Typography>
          <Box>
            <Typography variant="h6">
              <strong>Minimum: </strong>
              {report.minBloodOxygenation}
            </Typography>
            <Typography variant="h6">
              <strong>Moyenne: </strong>
              {report.averageBloodOxygenation?.toFixed(0)}
            </Typography>
            <Typography variant="h6">
              <strong>Maximum: </strong>
              {report.maxBloodOxygenation}
            </Typography>
          </Box>

          <Typography variant="h5">
            <strong>Température corporelle</strong>
          </Typography>
          <Box>
            <Typography variant="h6">
              <strong>Minimum: </strong>
              {report.minBodyTemperature}
            </Typography>
            <Typography variant="h6">
              <strong>Moyenne: </strong>
              {report.averageBodyTemperature?.toFixed(1)}
            </Typography>
            <Typography variant="h6">
              <strong>Maximum: </strong>
              {report.maxBodyTemperature}
            </Typography>
          </Box>

          <Typography variant="h5">
            <strong>Niveau de stress</strong>
          </Typography>
          <Box>
            <Typography variant="h6">
              <strong>Minimum: </strong>
              {report.minStressLevel}
            </Typography>
            <Typography variant="h6">
              <strong>Moyenne: </strong>
              {report.averageStressLevel?.toFixed(0)}
            </Typography>
            <Typography variant="h6">
              <strong>Maximum: </strong>
              {report.maxStressLevel}
            </Typography>
          </Box>

          <Typography variant="h5">
            <strong>Qualité du sommeil</strong>
          </Typography>
          <Box>
            <Typography variant="h6">
              <strong>Durée du sommeil: </strong>
              {report.totalSleepDuration?.toFixed(1)}h
            </Typography>
          </Box>
        </Card>
      </AccordionDetails>
    </Accordion>
  )
}

export default ReportCard
