import { ThemeOptions } from '@mui/material';

import colors from './colors';
import typography from './typography';

const components: ThemeOptions['components'] = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        borderRadius: 4,
        fontWeight: 600,
        textTransform: 'capitalize',
        boxShadow: 'none',
        gap: 8,
        '&:hover': {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
      },
      sizeSmall: {
        ...typography.caption,
        padding: '8px',
        lineHeight: 1.5,
      },
      sizeMedium: {
        ...typography.body3,
        padding: '8px 12px',
      },
      sizeLarge: {
        ...typography.body2,
        padding: '12px 16px',
      },
      contained: {
        backgroundColor: colors.green200,
        color: colors.black50,
        '&:hover': {
          backgroundColor: colors.green100,
        },
        '&:active': {
          backgroundColor: colors.green300,
        },
        '&:disabled': {
          border: `1px solid ${colors.black300}`,
          backgroundColor: 'transparent',
          color: colors.black300,
        },
      },
      outlined: {
        backgroundColor: 'transparent',
        color: colors.black900,
        border: `1px solid ${colors.black900}`,
        '&:hover': {
          backgroundColor: colors.black900,
          color: colors.black100,
        },
        '&:active': {
          backgroundColor: colors.black400,
          border: `1px solid ${colors.black400}`,
          color: colors.black100,
        },
        '&:disabled': {
          border: `1px solid ${colors.black300}`,
          backgroundColor: 'transparent',
          color: colors.black300,
        },
      },
    },
  },
  MuiIconButton: {
    defaultProps: {
      size: 'medium',
    },
    styleOverrides: {
      sizeSmall: {
        height: 28,
        width: 28,
      },
      sizeMedium: {
        height: 36,
        width: 36,
      },
      sizeLarge: {
        height: 40,
        width: 40,
      },
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        overflowX: 'auto',
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        height: '100%',
      },
    },
  },
  MuiSvgIcon: {
    defaultProps: {
      fontSize: 'large',
    },
    styleOverrides: {
      fontSizeSmall: {
        fontSize: 18,
      },
      fontSizeMedium: {
        fontSize: 20,
      },
      fontSizeLarge: {
        fontSize: 24,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'filled',
      rows: 8,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        color: colors.black900,
        padding: '6px 12px',
        '& .MuiSvgIcon-root': {
          color: colors.black400,
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.black400,
          },
          '& .MuiSvgIcon-root': {
            color: colors.black400,
          },
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderColor: colors.green200,
          },
          '& .MuiSvgIcon-root': {
            color: colors.green200,
          },
        },
      },
      notchedOutline: {
        borderColor: colors.black400,
      },
      input: {
        padding: 0,
        '&::placeholder': {
          opacity: 1,
          color: colors.black400,
        },
      },
      multiline: {
        padding: 0,
      },
    },
  },
  MuiFilledInput: {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 10,
        color: colors.black900,
        border: `1px solid ${colors.black400}`,
        backgroundColor: colors.black50,
        overflow: 'hidden',
        '&:hover': {
          borderColor: colors.green200,
          backgroundColor: colors.black50,
        },
        '&.Mui-focused': {
          borderColor: colors.green200,
          backgroundColor: colors.black50,
        },
        '&.Mui-error': {
          backgroundColor: colors.black50,
          borderColor: colors.red100,
          color: colors.red100,
        },
        '&.Mui-disabled': {
          backgroundColor: colors.black50,
          borderColor: colors.black300,
        },
      },
      input: {
        '&.Mui-disabled': {
          WebkitTextFillColor: colors.black300,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        ...typography.body1,
        color: colors.black400,
        '&.Mui-focused': {
          color: colors.green200,
        },
        '&.Mui-error': {
          color: colors.red100,
        },
        '&.Mui-disabled': {
          color: colors.black300,
        },
      },
      shrink: {
        ...typography.body2,
        fontWeight: 600,
        color: colors.black400,
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        margin: 0,
      },
      primary: {
        ...typography.caption,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 40,
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: colors.green200,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: 0,
        maxWidth: 700,
        maxHeight: '80vh',

        '@media (max-width: 768px)': {
          maxHeight: '100%',
        },
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variant: 'body2',
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    },
  },
};

export default components;
