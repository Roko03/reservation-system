import React from 'react';

import { MobileTimePicker, MobileTimePickerProps, TimeView } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const TimePicker: React.FC<MobileTimePickerProps<TimeView, true>> = ({ value, onChange, ...props }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MobileTimePicker
      value={value}
      onChange={onChange}
      {...props}
      slotProps={{
        textField: {
          sx: {
            width: '100%',
          },
        },
      }}
    />
  </LocalizationProvider>
);

export default TimePicker;
