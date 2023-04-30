import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';

// Register the locale for date-fns (used by react-datepicker)
registerLocale('en-GB', enGB);

const CustomDatePicker = ({onChange}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="dd-MM-yyyy"
        locale="en-GB"
      />
    </div>
  );
};

export default CustomDatePicker;
