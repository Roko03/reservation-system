import React from 'react';

import { Button, DialogActions } from '@mui/material';
import { PickersActionBarProps } from '@mui/x-date-pickers';

interface CustomPickersActionBarProps extends PickersActionBarProps {
  onAccept?: () => void;
  onCancel?: () => void;
}

const DatePickerActions: React.FC<CustomPickersActionBarProps> = ({ onAccept, onCancel, className }) => (
  <DialogActions className={className}>
    <Button variant="outlined" onClick={onCancel}>
      Cancel
    </Button>
    <Button onClick={onAccept}>OK</Button>
  </DialogActions>
);

export default DatePickerActions;
