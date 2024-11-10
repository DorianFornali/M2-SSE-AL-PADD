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

type BarChartProps = {
  data: MultiValue[]
  bars: { name: string; color: string; stackId: string }[]
  unit: string
  period: string
  handlePeriod: (_: unknown, newTime: string) => void
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const { data, bars, unit, period, handlePeriod } = props

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
