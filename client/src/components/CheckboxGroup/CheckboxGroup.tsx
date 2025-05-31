import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material';

import colors from '@/styles/themes/colors';

export interface CheckboxOption {
  value: string;
  label: string;
}

export interface CheckboxGroupProps {
  value: string[];
  options: CheckboxOption[];
  onChange: (value: string[]) => void;
  label?: string;
  labelPlacement?: 'top' | 'bottom' | 'start' | 'end';
  directionRow?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  onChange,
  value,
  label,
  labelPlacement,
  directionRow,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: selectedValue, checked } = event.target;

    if (checked) {
      onChange([...value, selectedValue]);
    } else {
      onChange(value.filter(val => val !== selectedValue));
    }
  };

  return (
    <FormControl>
      {label && <FormLabel sx={{ pb: 0 }}>{label}</FormLabel>}
      <FormGroup row={directionRow}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={<Typography variant="body2">{option.label}</Typography>}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                checkedIcon={<CheckIcon sx={{ fontSize: 16, color: colors.black50 }} />}
                onChange={handleChange}
                sx={{ mr: 1 }}
              />
            }
            labelPlacement={labelPlacement}
            sx={{ mt: 2, mr: 8, mb: 1, ml: 0 }}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;
