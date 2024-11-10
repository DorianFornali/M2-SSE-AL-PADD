import React from 'react'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import { green, red } from '@mui/material/colors'

type HealthCardProps = {
  name: string
  healthStatus: 'good' | 'bad'
}

const HealthCard: React.FC<HealthCardProps> = ({ name, healthStatus }) => {
  const isHealthy = healthStatus === 'good'

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
          Health Status: {isHealthy ? 'Good Health' : 'Bad Health'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default HealthCard
