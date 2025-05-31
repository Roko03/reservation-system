import { ChangeEvent, useEffect, useState } from 'react';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, SxProps, TextField, Theme } from '@mui/material';
import debounce from 'lodash.debounce';

import useBreakpoint from '@/utils/hooks/useBreakpoint';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disableDebounce?: boolean;
  sx?: SxProps<Theme>;
}

const Search = ({ value, onChange, placeholder, disableDebounce = false, sx }: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string>(value);
  const [debouncedChangeHandler] = useState(() => debounce(onChange, 500));
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setSearchValue(newValue);

    if (disableDebounce) {
      onChange(newValue);
    } else {
      debouncedChangeHandler(newValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    onChange('');
  };

  return (
    <TextField
      value={searchValue}
      variant="outlined"
      placeholder={placeholder}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ visibility: searchValue ? 'visible' : 'hidden' }}>
              <IconButton aria-label="Clear" onClick={handleClear} size="small">
                <ClearOutlinedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          inputProps: {
            inputMode: 'search',
          },
        },
      }}
      fullWidth={isMobile}
      sx={sx}
    />
  );
};

export default Search;
