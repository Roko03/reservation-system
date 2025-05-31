import React from 'react';

import { ExpandMoreRounded } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

export interface SelectOption {
  id: string;
  label: string | React.ReactElement;
}

export interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (event: SelectChangeEvent) => void;
  placeholder?: string;
  label?: string;
  error?: string | undefined;
  sx?: SxProps<Theme>;
}

const Select = ({ value, options, onChange, placeholder, label, error, sx }: SelectProps) => (
  <FormControl fullWidth>
    {label && <FormLabel>{label}</FormLabel>}
    <MuiSelect onChange={onChange} value={value} IconComponent={ExpandMoreRounded} error={!!error} displayEmpty sx={sx}>
      <MenuItem disabled value="">
        <Typography variant="body1">{placeholder}</Typography>
      </MenuItem>
      {options.map(option => (
        <MenuItem key={option.id} value={option.id}>
          <Typography variant="body1">{option.label}</Typography>
        </MenuItem>
      ))}
    </MuiSelect>
    <FormHelperText error={!!error}>{error}</FormHelperText>
  </FormControl>
);

export default Select;
