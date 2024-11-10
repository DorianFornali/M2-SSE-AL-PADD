import React from 'react'
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { MultiValue } from './types'

type LineChartProps = {
  data: MultiValue[]
  lines: {
    name: string
    color: string
  }[]
  unit: string
  period: string
  handlePeriod: (_: unknown, newTime: string) => void
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { data, lines, unit, period, handlePeriod } = props

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
          <XAxis
            dataKey="label"
            tickFormatter={(date) => {
              const d = new Date(date)
              return `${d.getDate()} / ${d.getMonth() + 1}`
            }}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => {
              const d = new Date(date)
              return `${d.getDate()} / ${d.getMonth() + 1}`
            }}
            formatter={(value) => `${value} ${unit}`}
          />
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
      <ToggleButtonGroup value={period} exclusive onChange={handlePeriod}>
        <ToggleButton value="1w">7j</ToggleButton>
        <ToggleButton value="1m">1m</ToggleButton>
        <ToggleButton value="3m">3m</ToggleButton>
        <ToggleButton value="6m">6m</ToggleButton>
        <ToggleButton value="1y">1a</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

export default LineChart
