export const theme = {
  colors: {
    // Background colors (Dark Mode)
    background: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      dark: '#1a1a1a',
      darker: '#2a2a2a',
      darkest: '#3a3a3a',
      light: '#2a2a2a',
    },

    // Text colors (Dark Mode)
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
      tertiary: '#b0b0b0',
      muted: '#888888',
      white: '#ffffff',
      light: '#e0e0e0',
    },

    // Brand colors (original + Figma)
    brand: {
      primary: '#d62300',
      secondary: '#ffa500',
      accent: '#5c3317',
      success: '#4ade80',
      blue: '#4285f4',
      blueHover: '#357ae8',
    },

    // Border colors (Dark Mode)
    border: {
      primary: '#3a3a3a',
      secondary: '#2a2a2a',
      light: '#4a4a4a',
      dark: '#2a2a2a',
      darker: '#3a3a3a',
    },

    // Status colors
    status: {
      pending: '#ffa500',
      preparing: '#3B82F6',
      completed: '#10B981',
      warning: '#f59e0b',
      danger: '#ef4444',
    },

    // Legacy colors for compatibility
    primary: '#d62300',
    secondary: '#ffa500',
    accent: '#5c3317',
    white: '#ffffff',
    black: '#000000',

    // Gradients
    gradientOrange: 'linear-gradient(180deg, #ffa500 0%, #ff8c00 100%)',
    gradientBrown: 'linear-gradient(180deg, #6b4423 0%, #4a2c1a 100%)',
    gradientPrimary: 'linear-gradient(135deg, #d62300 0%, #ffa500 100%)',
    gradientDark: 'linear-gradient(180deg, #d62300 0%, #5c3317 100%)',

    // Alpha colors
    whiteAlpha80: 'rgba(255, 255, 255, 0.8)',
    whiteAlpha60: 'rgba(255, 255, 255, 0.6)',
    whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
    whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
    whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
    blackAlpha08: 'rgba(0, 0, 0, 0.08)',
    blackAlpha10: 'rgba(0, 0, 0, 0.1)',
    blackAlpha12: 'rgba(0, 0, 0, 0.12)',
    blackAlpha15: 'rgba(0, 0, 0, 0.15)',
    blackAlpha20: 'rgba(0, 0, 0, 0.2)',
    blackAlpha25: 'rgba(0, 0, 0, 0.25)',
    accentAlpha70: 'rgba(92, 51, 23, 0.7)',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px',

    // Layout specific
    section: '80px',
    container: '96px',
    headerHeight: '88px',
  },

  fontSize: {
    '2xs': '11px',
    xs: '12px',
    sm: '13px',
    md: '14px',
    base: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '30px',
    '5xl': '32px',
    '6xl': '36px',
    '7xl': '42px',
    hero: '60px',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  fontFamily: {
    nanumGothic: 'var(--font-nanum-gothic)',
    ttangsbudae: 'var(--font-ttangsbudae)',
    miwon: 'var(--font-miwon)',
    bagelFat: '"BagelFat", sans-serif',
    primary: 'var(--font-nanum-gothic)',
    secondary: 'var(--font-nanum-gothic)',
  },

  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '26px',
    full: '9999px',
  },

  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.4)',
    md: '0 4px 16px rgba(0, 0, 0, 0.5)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
    xl: '0 4px 12px rgba(0, 0, 0, 0.5)',
    '2xl': '0 6px 16px rgba(0, 0, 0, 0.7)',
    button: '0 2px 8px rgba(0, 0, 0, 0.5)',
  },

  transition: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    all: 'all 0.2s ease',
    allNormal: 'all 0.3s ease',
  },

  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    fixed: 50,
    overlay: 100,
    modal: 200,
  },

  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultrawide: '1440px',
  },

  sizes: {
    // Sidebar
    sidebarWidth: '64px',

    // Buttons
    buttonSm: '28px',
    buttonMd: '40px',
    buttonLg: '48px',

    // Icons
    iconSm: '14px',
    iconMd: '20px',
    iconLg: '24px',
    icon2xl: '48px',

    // Cards
    navButtonHeight: '64px',

    // Legacy
    maxWidth: '1280px',
    maxWidthFull: '1440px',
    heroWidth: '824px',
    heroHeight: '545px',
    orderCardHeight: '225px',
    orderHistoryHeight: '544px',
    controlButton: '40px',
    indicatorSmall: '12px',
    indicatorLarge: '48px',
  },
} as const;

export type Theme = typeof theme;

