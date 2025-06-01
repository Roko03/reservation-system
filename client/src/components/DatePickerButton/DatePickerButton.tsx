// @ts-nocheck
import React, { useRef, useState } from 'react';

import { CalendarMonth } from '@mui/icons-material';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BaseSingleInputFieldProps, DateValidationError, FieldSection } from '@mui/x-date-pickers/models';
import { Dayjs } from 'dayjs';

import DatePickerActions from '@/components/DatePickerActions';
import IconButtonRounded from '@/components/IconButtonRounded';
import DateTime from '@/utils/static/DateTime';

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, false, DateValidationError> {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonField = (props: ButtonFieldProps) => {
  const { setOpen, id, disabled, InputProps: { ref } = {}, inputProps: { 'aria-label': ariaLabel } = {} } = props;

  return (
    <IconButtonRounded
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.(prev => !prev)}
    >
      <CalendarMonth />
    </IconButtonRounded>
  );
};

const DatePickerButton: React.FC<DatePickerProps<Dayjs>> = ({ value, onChange, ...props }) => {
  const [open, setOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box ref={boxRef}>
        <DatePicker
          value={value || DateTime.now()}
          onChange={onChange}
          slots={{ ...props.slots, field: ButtonField, actionBar: DatePickerActions }}
          slotProps={{
            ...props.slotProps,
            field: { setOpen },
            mobilePaper: { sx: { margin: 0 } },
            actionBar: {
              actions: ['cancel', 'accept'],
            },
            popper: {
              anchorEl: boxRef.current,
            },
          }}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          {...props}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DatePickerButton;
