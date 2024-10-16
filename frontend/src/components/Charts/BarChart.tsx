import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { MultiValue } from './types'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useMemo, useState } from 'react'

type BarChartProps = {
  data: MultiValue[]
  bars: { name: string; color: string; stackId: string }[]
  unit: string
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const { data, bars, unit } = props

  const [period, setPeriod] = useState('1m')

  const handlePeriod = (_: unknown, newTime: string) => {
    setPeriod(newTime)
  }

  const dataToShow = useMemo(() => {
    if (period === '1w') {
      return data.slice(-7)
    }
    if (period === '1m') {
      return data.slice(-30)
    }
    if (period === '3m') {
      return data.slice(-90)
    }
    if (period === '6m') {
      return data.slice(-180)
    }
    if (period === '1y') {
      return data
    }
    return data
  }, [data, period])

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
        <RechartsBarChart
          data={dataToShow}
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
          {bars.map((bar, key) => (
            <Bar
              key={key}
              type="monotone"
              dataKey={bar.name}
              fill={bar.color}
              stackId={bar.stackId}
            />
          ))}
          <Legend />
        </RechartsBarChart>
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

export default BarChart
