import * as React from 'react';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

dayjs.extend(CustomParseFormat);

const DatePickerMui = ({ onChange }) => {
  const [startDate, setStartDate] = useState(dayjs().format('DD-MM-YY'));

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format('DD-MM-YY');
    setStartDate(formattedDate);
    if (onChange) {
      onChange(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD-MM-YY"
        value={dayjs(startDate, 'DD-MM-YY')}
        onChange={handleDateChange}
        label="Data"
        sx={{ m: 1, width: '25ch' }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerMui;
