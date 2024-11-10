import React from 'react'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

type HealthCardProps = {
  name: string
  healthStatus: string
}

const HealthCard: React.FC<HealthCardProps> = ({ name, healthStatus }) => {
  const { t } = useTranslation()
  const isHealthy = healthStatus === 'Very Good' || healthStatus === 'Good'

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        backgroundColor: isHealthy ? green[50] : red[50],
        marginTop: 2,
      }}
    >
      <Avatar
        sx={{ bgcolor: isHealthy ? green[500] : red[500], marginRight: 2 }}
      >
        {name.charAt(0).toUpperCase()}
      </Avatar>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="textSecondary">
          État de santé général: {t(`generalState.${healthStatus}`)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default HealthCard
