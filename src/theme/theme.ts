import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import { THEME_COLORS } from '../constants/constants';

const themeConfig: ThemeOptions = {
  palette: {
    primary: {
      main: THEME_COLORS.PRIMARY,
      dark: THEME_COLORS.PRIMARY_DARK,
      light: '#52606f'
    },
    secondary: {
      main: THEME_COLORS.SECONDARY,
      dark: '#d4d9dd',
      light: '#f5f5f5'
    },
    success: {
      main: THEME_COLORS.SUCCESS
    },
    error: {
      main: THEME_COLORS.ERROR
    },
    warning: {
      main: THEME_COLORS.WARNING
    },
    info: {
      main: THEME_COLORS.INFO
    },
    background: {
      default: THEME_COLORS.SECONDARY,
      paper: '#ffffff'
    },
    text: {
      primary: THEME_COLORS.TEXT_PRIMARY,
      secondary: THEME_COLORS.TEXT_SECONDARY
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: THEME_COLORS.TEXT_PRIMARY
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: THEME_COLORS.TEXT_PRIMARY
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: THEME_COLORS.TEXT_PRIMARY
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: THEME_COLORS.TEXT_PRIMARY
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: THEME_COLORS.TEXT_PRIMARY
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: THEME_COLORS.TEXT_PRIMARY
    },
    body1: {
      fontSize: '1rem',
      color: THEME_COLORS.TEXT_PRIMARY
    },
    body2: {
      fontSize: '0.875rem',
      color: THEME_COLORS.TEXT_SECONDARY
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.5px'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '4px',
        padding: '10px 24px',
        transition: 'all 0.3s ease'
      },
      contained: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
        }
      },
      outlined: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px'
        }
      }
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '4px',
          '&:hover fieldset': {
            borderColor: THEME_COLORS.PRIMARY
          },
          '&.Mui-focused fieldset': {
            borderColor: THEME_COLORS.PRIMARY
          }
        }
      }
    },
    MuiPaper: {
      root: {
        borderRadius: '8px'
      },
      elevation1: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }
    },
    MuiAppBar: {
      root: {
        backgroundColor: THEME_COLORS.PRIMARY
      }
    },
    MuiTableCell: {
      head: {
        backgroundColor: THEME_COLORS.PRIMARY,
        color: '#fff',
        fontWeight: 600
      }
    },
    MuiDialog: {
      paper: {
        borderRadius: '8px'
      }
    },
    MuiSnackbarContent: {
      root: {
        borderRadius: '4px'
      }
    }
  }
};

export const theme = createTheme(themeConfig);

export default theme;
