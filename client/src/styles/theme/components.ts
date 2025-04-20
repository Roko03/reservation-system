import { ThemeOptions } from '@mui/material';

const components: ThemeOptions['components'] = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
  },
};

export default components;
