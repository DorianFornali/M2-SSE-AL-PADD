import React from 'react'
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Box } from '@mui/material'
import { MultiValue } from './types'

type LineChartProps = {
  data: MultiValue[]
  lines: {
    name: string
    color: string
  }[]
  unit: string
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { data, lines, unit } = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginTop: '30px',
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} ${unit}`} />
          {lines.map((line, key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={line.name}
              stroke={line.color}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default LineChart
