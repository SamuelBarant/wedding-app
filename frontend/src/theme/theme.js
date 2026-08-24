import { createTheme } from '@mui/material/styles';

// Tokens de color extraídos de las pantallas de Google Stitch
export const weddingColors = {
  outline: '#7f7667',
  onSurfaceVariant: '#4e4639',
  errorContainer: '#ffdad6',
  onSecondary: '#ffffff',
  onSecondaryFixedVariant: '#743041',
  surfaceContainerHighest: '#e9e1d8',
  secondaryContainer: '#fda2b4',
  onError: '#ffffff',
  background: '#fff8f3',
  primaryContainer: '#c5a059',
  surfaceContainer: '#f5ede4',
  onSurface: '#1e1b16',
  surfaceContainerLowest: '#ffffff',
  tertiary: '#485e8b',
  error: '#ba1a1a',
  primaryFixed: '#ffdea5',
  surfaceDim: '#e1d9d0',
  surface: '#fff8f3',
  outlineVariant: '#d1c5b4',
  surfaceContainerLow: '#fbf2e9',
  onPrimary: '#ffffff',
  secondaryFixed: '#ffd9df',
  primary: '#775a19',
  onBackground: '#1e1b16',
  onPrimaryContainer: '#4e3700',
  surfaceVariant: '#e9e1d8',
  surfaceContainerHigh: '#efe7de',
  onTertiary: '#ffffff',
  tertiaryContainer: '#8fa5d6',
  onSecondaryContainer: '#793545',
  secondary: '#914758',
  inverseSurface: '#34302a',
  onTertiaryContainer: '#233a65',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: weddingColors.primary,
      light: weddingColors.primaryContainer,
      dark: weddingColors.onPrimaryContainer,
      contrastText: weddingColors.onPrimary,
    },
    secondary: {
      main: weddingColors.secondary,
      light: weddingColors.secondaryContainer,
      contrastText: weddingColors.onSecondary,
    },
    error: {
      main: weddingColors.error,
      light: weddingColors.errorContainer,
    },
    background: {
      default: weddingColors.background,
      paper: weddingColors.surfaceContainerLowest,
    },
    text: {
      primary: weddingColors.onSurface,
      secondary: weddingColors.onSurfaceVariant,
    },
    divider: weddingColors.outlineVariant,
    wedding: weddingColors,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    subtitle1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    body3: { fontSize: '0.7rem', lineHeight: 1, fontStyle: 'italic' },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: '0.9375rem',
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingTop: 12,
          paddingBottom: 12,
          boxShadow: 'none',
        },
        containedPrimary: {
          '&:hover': { boxShadow: '0 8px 24px rgba(181,101,118,0.2)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(181,101,118,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,248,243,0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default theme;
