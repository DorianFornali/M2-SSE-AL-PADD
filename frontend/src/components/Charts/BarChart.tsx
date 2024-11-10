import { Box } from '@mui/material'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { MultiValue } from './types'

type BarChartProps = {
  data: MultiValue[]
  bars: { name: string; color: string; stackId: string }[]
  unit: string
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const { data, bars, unit } = props

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
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} ${unit}`} />
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
    </Box>
  )
}

export default BarChart
