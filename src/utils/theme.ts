import { PRIORITY_COLORS } from "./constants";
import { Theme } from "./types";

// Default theme
export const defaultTheme: Theme = {
  colors: {
    background: '#212228',
    linearGradiant: 'linear-gradient(#292a30 0.1em, transparent 0.1em), linear-gradient(90deg, #292a30 0.1em, transparent 0.1em)',
    text: {
      primary: '#333333',
      secondary: '#666666',
      error: '#d32f2f',
      tertiary: '#9ca3af',
      light: '#FFFFFF',
    },
    ui: {
      dark: '#35363e',
      medium: '#6B6B6B',
      light: '#DEDEDE',
      superLight: '#F5F5F5',
    },
    button: {
      primary: '#66bb6a',
      primaryHover: '#4caf50',
      secondary: 'transparent',
      secondaryHover: 'rgba(0, 0, 0, 0.05)',
    },
    modal: {
      background: '#35363e',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
      background: '#2a2b32',
      border: '#DEDEDE',
      text: '#FFFFFF',
      placeholder: 'rgba(255, 255, 255, 0.5)',
    },
    priority: PRIORITY_COLORS,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    m: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    round: '50%',
  },
  shadows: {
    xs: '0 0 0 2px #4d79ff',
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSizes: {
        x: '0.6rem',
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        xm: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.75rem', 
        '3xl': '2rem',  
        '4xl': '2.5rem',
      },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tightest: 1.2,
      tighter: 1.3,
      tight: 1.4,
      normal: 1.5,
      relaxed: 1.6,
    },
  },
  sizes: {
    controlsHeight: '40px',
    buttonSize: '40px',
    iconSize: '24px',
    modalMaxWidth: '400px',
    searchSize: '300px',
    backgroundSize: '4em 4em',
  },
  zIndices: {
    controls: 100,
    priorityKey: 500,
    modal: 1000,
    tooltip: 1001,
  },
};

// Dark theme (for future use)
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#222222',
    text: {
      primary: '#FFFFFF',
      secondary: '#DDDDDD',
      tertiary: '#9ca3af',
      error: '#d32f2f',
      light: '#FFFFFF',
    },
    ui: {
      dark: '#35363e',
      medium: '#666666',
      light: '#444444',
      superLight: '#333333',
    },
    input: {
      background: '#444444',
      border: '#666666',
      text: '#FFFFFF',
      placeholder: 'rgba(255, 255, 255, 0.5)',
    },
  },
};