import React from 'react';

import { Button, DialogActions } from '@mui/material';
import { usePickerActionsContext } from '@mui/x-date-pickers';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';

const DatePickerActions: React.FC<PickersActionBarProps> = ({ actions, className }) => {
  const { acceptValueChanges, cancelValueChanges, clearValue } = usePickerActionsContext();

  return (
    <DialogActions className={className}>
      {actions?.includes('clear') && (
        <Button variant="text" onClick={clearValue}>
          Izbrisi
        </Button>
      )}
      {actions?.includes('cancel') && (
        <Button variant="outlined" onClick={acceptValueChanges}>
          Ponisti
        </Button>
      )}
      {actions?.includes('accept') && <Button onClick={cancelValueChanges}>OK</Button>}
    </DialogActions>
  );
};

export default DatePickerActions;
