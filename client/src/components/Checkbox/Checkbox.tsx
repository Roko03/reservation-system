import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  Typography,
} from '@mui/material';

import colors from '@/styles/themes/colors';

interface CheckboxProps extends MuiCheckboxProps {
  label?: string;
  labelPlacement?: 'top' | 'bottom' | 'start' | 'end';
}

const Checkbox: React.FC<CheckboxProps> = ({ value, checked, onChange, label, labelPlacement, ...props }) => (
  <FormControlLabel
    control={
      <MuiCheckbox
        value={value}
        checked={checked}
        onChange={onChange}
        checkedIcon={<CheckIcon sx={{ fontSize: 16, color: colors.black50 }} />}
        {...props}
      />
    }
    label={
      <Typography variant="body2" mb={1} noWrap>
        {label}
      </Typography>
    }
    labelPlacement={labelPlacement}
    sx={{ mr: 0 }}
  />
);

export default Checkbox;
