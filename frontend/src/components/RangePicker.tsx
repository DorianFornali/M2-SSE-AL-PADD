import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

type RangePickerProps = {
  startDate: Dayjs | null
  endDate: Dayjs | null
  setStartDate: (date: Dayjs | null) => void
  setEndDate: (date: Dayjs | null) => void
}

const RangePicker: React.FC<RangePickerProps> = (props) => {
  const { startDate, endDate, setStartDate, setEndDate } = props

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
    >
      Du
      <DatePicker value={startDate} onChange={setStartDate} />
      au
      <DatePicker value={endDate} onChange={setEndDate} />
    </Box>
  )
}

export default RangePicker
