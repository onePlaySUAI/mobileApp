// Global color constants for consistent theming across the app

export const Colors = {
  // Primary Colors
  primary: '#1DB954', // Spotify green
  primaryDark: '#1ed760',
  secondary: '#1A1A1A',
  accent: '#FF0000',

  // Dark Theme
  dark: {
    background: '#121212',
    surface: '#1a1a1a',
    surfaceLight: '#282828',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    textTertiary: '#888888',
    border: '#38383a',
    divider: '#282828',
  },

  // Light Theme
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    surfaceLight: '#e8e8e8',
    text: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    border: '#e5e5e5',
    divider: '#f0f0f0',
  },

  // Gradients
  gradient: {
    spotify: ['#1DB954', '#1aa34a', '#0c6e3a'],
    rainbow: ['#FF0000', '#A54A22', '#1DB954'],
    dark: ['#1a1a1a', '#0a0a0a'],
  },

  // Semantic Colors
  success: '#1DB954',
  warning: '#FFA500',
  error: '#FF0000',
  info: '#0099FF',
};

export const getThemeColors = (isDark: boolean) => isDark ? Colors.dark : Colors.light;