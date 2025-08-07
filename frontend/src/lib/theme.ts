'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // Material Indigo
      light: '#7986cb',
      dark: '#303f9f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#607d8b', // Blue Grey
      light: '#90a4ae',
      dark: '#455a64',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e57373', // Softer red
      light: '#ffab91',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffb74d', // Soft orange
      light: '#ffcc80',
      dark: '#ff9800',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#64b5f6', // Soft blue
      light: '#90caf9',
      dark: '#2196f3',
      contrastText: '#ffffff',
    },
    success: {
      main: '#81c784', // Soft green
      light: '#a5d6a7',
      dark: '#4caf50',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#f8f9fa', // Very soft off-white
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.75)', // Softer black
      secondary: 'rgba(0, 0, 0, 0.55)', // Lighter secondary text
      disabled: 'rgba(0, 0, 0, 0.35)',
    },
    divider: 'rgba(0, 0, 0, 0.08)', // Very subtle dividers
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)', // Very subtle hover
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    h2: {
      fontWeight: 300,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    h3: {
      fontWeight: 300,
      fontSize: '3rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    h4: {
      fontWeight: 400,
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
      color: 'rgba(0, 0, 0, 0.65)',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
      color: 'rgba(0, 0, 0, 0.65)',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.08),0px 1px 1px 0px rgba(0,0,0,0.06),0px 1px 3px 0px rgba(0,0,0,0.04)', // Very soft shadows
    '0px 3px 1px -2px rgba(0,0,0,0.08),0px 2px 2px 0px rgba(0,0,0,0.06),0px 1px 5px 0px rgba(0,0,0,0.04)',
    '0px 3px 3px -2px rgba(0,0,0,0.08),0px 3px 4px 0px rgba(0,0,0,0.06),0px 1px 8px 0px rgba(0,0,0,0.04)',
    '0px 2px 4px -1px rgba(0,0,0,0.08),0px 4px 5px 0px rgba(0,0,0,0.06),0px 1px 10px 0px rgba(0,0,0,0.04)',
    '0px 3px 5px -1px rgba(0,0,0,0.08),0px 5px 8px 0px rgba(0,0,0,0.06),0px 1px 14px 0px rgba(0,0,0,0.04)',
    '0px 3px 5px -1px rgba(0,0,0,0.08),0px 6px 10px 0px rgba(0,0,0,0.06),0px 1px 18px 0px rgba(0,0,0,0.04)',
    '0px 4px 5px -2px rgba(0,0,0,0.08),0px 7px 10px 1px rgba(0,0,0,0.06),0px 2px 16px 1px rgba(0,0,0,0.04)',
    '0px 5px 5px -3px rgba(0,0,0,0.08),0px 8px 10px 1px rgba(0,0,0,0.06),0px 3px 14px 2px rgba(0,0,0,0.04)',
    '0px 5px 6px -3px rgba(0,0,0,0.08),0px 9px 12px 1px rgba(0,0,0,0.06),0px 3px 16px 2px rgba(0,0,0,0.04)',
    '0px 6px 6px -3px rgba(0,0,0,0.08),0px 10px 14px 1px rgba(0,0,0,0.06),0px 4px 18px 3px rgba(0,0,0,0.04)',
    '0px 6px 7px -4px rgba(0,0,0,0.08),0px 11px 15px 1px rgba(0,0,0,0.06),0px 4px 20px 3px rgba(0,0,0,0.04)',
    '0px 7px 8px -4px rgba(0,0,0,0.08),0px 12px 17px 2px rgba(0,0,0,0.06),0px 5px 22px 4px rgba(0,0,0,0.04)',
    '0px 7px 8px -4px rgba(0,0,0,0.08),0px 13px 19px 2px rgba(0,0,0,0.06),0px 5px 24px 4px rgba(0,0,0,0.04)',
    '0px 7px 9px -4px rgba(0,0,0,0.08),0px 14px 21px 2px rgba(0,0,0,0.06),0px 5px 26px 4px rgba(0,0,0,0.04)',
    '0px 8px 9px -5px rgba(0,0,0,0.08),0px 15px 22px 2px rgba(0,0,0,0.06),0px 6px 28px 5px rgba(0,0,0,0.04)',
    '0px 8px 10px -5px rgba(0,0,0,0.08),0px 16px 24px 2px rgba(0,0,0,0.06),0px 6px 30px 5px rgba(0,0,0,0.04)',
    '0px 8px 11px -5px rgba(0,0,0,0.08),0px 17px 26px 2px rgba(0,0,0,0.06),0px 6px 32px 5px rgba(0,0,0,0.04)',
    '0px 9px 11px -5px rgba(0,0,0,0.08),0px 18px 28px 2px rgba(0,0,0,0.06),0px 7px 34px 6px rgba(0,0,0,0.04)',
    '0px 9px 12px -6px rgba(0,0,0,0.08),0px 19px 29px 2px rgba(0,0,0,0.06),0px 7px 36px 6px rgba(0,0,0,0.04)',
    '0px 10px 13px -6px rgba(0,0,0,0.08),0px 20px 31px 3px rgba(0,0,0,0.06),0px 8px 38px 7px rgba(0,0,0,0.04)',
    '0px 10px 13px -6px rgba(0,0,0,0.08),0px 21px 33px 3px rgba(0,0,0,0.06),0px 8px 40px 7px rgba(0,0,0,0.04)',
    '0px 10px 14px -6px rgba(0,0,0,0.08),0px 22px 35px 3px rgba(0,0,0,0.06),0px 8px 42px 7px rgba(0,0,0,0.04)',
    '0px 11px 14px -7px rgba(0,0,0,0.08),0px 23px 36px 3px rgba(0,0,0,0.06),0px 9px 44px 8px rgba(0,0,0,0.04)',
    '0px 11px 15px -7px rgba(0,0,0,0.08),0px 24px 38px 3px rgba(0,0,0,0.06),0px 9px 46px 8px rgba(0,0,0,0.04)',
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#3f51b5', // Use primary indigo color
          color: '#ffffff', // White text for good contrast
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f7fa',
          backgroundImage: 'none',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 500,
          minHeight: '40px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          },
        },
        contained: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
          '&:hover': {
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)',
          },
          '&:active': {
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#f0f4ff', // Light blue tinted background
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: '#e8f0fe', // Slightly deeper blue tint on hover
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff', // Clean white when focused
            },
            '& fieldset': {
              borderColor: 'rgba(63, 81, 181, 0.15)', // Subtle indigo border
            },
            '&:hover fieldset': {
              borderColor: 'rgba(63, 81, 181, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3f51b5', // Indigo focus border
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(0, 0, 0, 0.55)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f4ff', // Light blue tinted background
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: '#e8f0fe',
          },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(63, 81, 181, 0.08)', // Indigo selection
            '&:hover': {
              backgroundColor: 'rgba(63, 81, 181, 0.12)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 500,
        },
        colorError: {
          backgroundColor: '#ffebee',
          color: '#c62828',
          '&.MuiChip-outlined': {
            borderColor: '#e57373',
            backgroundColor: 'transparent',
          },
        },
        colorWarning: {
          backgroundColor: '#fff3e0',
          color: '#ef6c00',
          '&.MuiChip-outlined': {
            borderColor: '#ffb74d',
            backgroundColor: 'transparent',
          },
        },
        colorInfo: {
          backgroundColor: '#e3f2fd',
          color: '#1565c0',
          '&.MuiChip-outlined': {
            borderColor: '#64b5f6',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          '&.MuiAlert-standardInfo': {
            backgroundColor: '#e8f4fd',
            border: '1px solid #b3d9f2',
            color: '#1565c0',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          borderRadius: '6px',
          height: '8px',
        },
      },
    },
  },
});