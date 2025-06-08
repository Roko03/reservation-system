import { StaticDatePicker as MuiStaticDatePicker, StaticDatePickerProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const StaticDatePicker: React.FC<StaticDatePickerProps> = ({ value, onChange, ...props }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MuiStaticDatePicker
      displayStaticWrapperAs="desktop"
      value={value}
      onChange={onChange}
      slots={{ actionBar: () => null }}
      {...props}
    />
  </LocalizationProvider>
);

export default StaticDatePicker;
