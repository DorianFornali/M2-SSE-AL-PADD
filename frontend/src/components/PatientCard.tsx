import React from 'react'
import { Card, CardContent, Typography, Avatar } from '@mui/material'

type PatientCardProps = {
  name: string
}

const PatientCard: React.FC<PatientCardProps> = ({ name }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
      </CardContent>
    </Card>
  )
}

export default PatientCard
