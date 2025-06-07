import { ThemeOptions, hexToRgb } from '@mui/material';

import colors from './colors';
import typography from './typography';

const components: ThemeOptions['components'] = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: colors.black50,
      },
    },
  },
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
  MuiToggleButton: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        border: 'none',
        color: colors.black950,
        fontWeight: 400,
        padding: 10,
        ...typography.body1,
        marginRight: 12,
        '&:last-child': {
          marginRight: 0,
        },
        borderRadius: 10,
        '&:not(:first-of-type)': {
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        },
        '&:not(:last-of-type)': {
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
        '&:hover': {
          backgroundColor: colors.green300,
          color: colors.black50,
        },
        '&.Mui-selected': {
          backgroundColor: colors.green300,
          color: colors.black50,

          '&:hover': {
            backgroundColor: colors.green300,
          },
        },
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
  MuiFab: {
    defaultProps: {
      size: 'medium',
    },
    styleOverrides: {
      root: {
        backgroundColor: colors.black50,
        color: colors.black950,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: colors.black100,
        },
        '&:active': {
          backgroundColor: colors.black200,
        },
        '&:disabled': {
          backgroundColor: colors.black100,
          color: colors.black200,
        },
      },
      sizeMedium: {
        width: 40,
        height: 40,
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
    variants: [
      {
        props: { fontSize: 'extraSmall' },
        style: {
          fontSize: 16,
        },
      },
    ],
  },
  MuiOutlinedInput: {
    defaultProps: {
      rows: 8,
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
        color: colors.black500,
        backgroundColor: colors.black50,
      },
      input: {
        ...typography.body2,
        height: 36,
        padding: '10px 16px',
        '&::placeholder': {
          opacity: 1,
        },
        '@media (max-width: 768px)': {
          fontSize: 16,
        },
      },
      multiline: {
        padding: 0,
      },
      notchedOutline: {
        borderColor: colors.black500,
      },
      sizeSmall: {
        ...typography.body3,
        padding: '0px 8px',
        input: {
          padding: 0,
          width: 0,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        ...typography.body1,
        color: colors.black950,
        '&.Mui-focused': {
          color: colors.black950,
        },
        '&.Mui-error': {
          color: colors.red100,
        },
        '&.Mui-disabled': {
          color: colors.black200,
        },
      },
      shrink: {
        ...typography.body2,
        fontWeight: 600,
        color: colors.green300,
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        ...typography.body2,
        fontWeight: 600,
        display: 'block',
        color: colors.black950,
        paddingBottom: 4,
        '&.Mui-focused': {
          color: colors.black950,
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        '&.Mui-error': {
          color: colors.red100,
        },
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
        '@media (hover: hover)': {
          '&:hover': {
            backgroundColor: colors.green100,
          },
        },
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
  MuiChip: {
    styleOverrides: {
      root: {
        padding: 6,
        borderRadius: 6,
        height: 'auto',
      },
      label: {
        ...typography.body2,
        paddingLeft: 6,
        paddingRight: 6,
        overflow: 'visible',
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: colors.blue200,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        ...typography.body2,
        fontWeight: 500,
        color: colors.black950,
        '&:hover': {
          color: colors.black950,
        },
        '&.Mui-selected': {
          color: colors.black950,
        },
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        border: `1px solid ${colors.black500}`,
        borderRadius: 8,
        color: colors.black950,
        fontSize: 12,
        fontWeight: 600,
        '&:hover': {
          backgroundColor: colors.black100,
        },
        '&.Mui-selected': {
          backgroundColor: colors.black50,
          borderColor: colors.black600,
          color: colors.black600,
          cursor: 'default',
          pointerEvents: 'none',
          '&:hover': {
            backgroundColor: colors.black600,
            borderColor: colors.black600,
          },
        },
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
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 24,
        color: colors.black950,

        '@media (max-width: 768px)': {
          padding: 16,
        },
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: 24,
        color: colors.black950,

        '@media (max-width: 768px)': {
          padding: 16,
        },
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: 24,
        gap: 16,

        '@media (max-width: 768px)': {
          flexDirection: 'column-reverse',
        },
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        width: 24,
        height: 24,
        fontWeight: 500,
        ...typography.body3,
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
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
        padding: 0,
      },
      list: {
        padding: 8,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: 8,
        minHeight: 'auto',
        '&:hover': {
          backgroundColor: colors.green50,
        },
        '&:active': {
          backgroundColor: colors.green100,
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: colors.green50,
        },
        '&.Mui-checked:hover': {
          backgroundColor: colors.black950,
        },
      },
    },
  },
  MuiAutocomplete: {
    defaultProps: {
      slotProps: {
        paper: {
          elevation: 8,
        },
      },
    },
    styleOverrides: {
      input: {
        color: colors.black950,
        ...typography.body2,
        padding: '0',
        '@media (max-width: 768px)': {
          fontSize: 16,
        },
      },
      inputRoot: {
        height: 56,
        padding: '0px 10px',
      },
      option: {
        padding: '10px 16px',
      },
      noOptions: {
        ...typography.body2,
      },
      paper: {
        padding: 8,
        borderRadius: 8,
        margin: '8px 0px',
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        color: colors.black500,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.black500,
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.black950,
          },
        },
        '&.Mui-focused': {
          color: colors.black950,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.black950,
          },
        },
      },
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        padding: 0,
        margin: '16px 0px',
        '&:before': {
          display: 'none',
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: 8,
        minHeight: 0,
        backgroundColor: colors.green50,
        borderRadius: 10,
        color: colors.black950,
        '&.Mui-expanded': {
          minHeight: 'auto',
        },
      },
      content: {
        margin: 0,
        '&.Mui-expanded': {
          margin: 0,
        },
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        marginTop: 16,
        padding: '0px 8px',

        '@media (max-width: 768px)': {
          padding: 0,
        },
      },
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      root: {
        '&.Mui-active': {
          '& .MuiStepConnector-line': {
            borderColor: colors.black950,
          },
        },
        '&.Mui-completed': {
          '& .MuiStepConnector-line': {
            borderColor: colors.black950,
          },
        },
      },
      line: {
        borderColor: colors.green100,
        borderTopWidth: 3,
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: {
        boxShadow: `0px 4px 15px 0px rgba(${hexToRgb(colors.black950)}, 0.05)`,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        '&.MuiDivider-root': {
          margin: 4,
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 9,
      },
      thumb: {
        boxShadow: 'none',
        width: 14,
        height: 14,
        margin: 3,
        backgroundColor: colors.black50,
      },
      track: {
        borderRadius: 11,
        backgroundColor: colors.black950,
        opacity: 1,
      },
      switchBase: {
        '&.Mui-checked + .MuiSwitch-track': {
          opacity: 1,
        },
      },
    },
  },
};

export default components;
