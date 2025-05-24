import { ThemeOptions } from '@mui/material';

import colors from './colors';

const palette: ThemeOptions['palette'] = {
  primary: {
    main: colors.green100,
    contrastText: colors.black100,
  },
  secondary: {
    main: colors.black400,
    contrastText: colors.black900,
  },
  error: {
    main: colors.red100,
  },
  warning: {
    main: colors.orange,
  },
  success: {
    main: colors.green200,
  },
  info: {
    main: colors.blue100,
  },
};

export default palette;
