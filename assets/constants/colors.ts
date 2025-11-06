// Global color constants for consistent theming across the app

import { darkTheme } from './colors/themes/dark';
import { lightTheme } from './colors/themes/light';
import { gradients } from './colors/gradients';
import { semanticColors } from './colors/semantic';

export const Colors = {
  // Primary Colors
  primary: '#1DB954', // Spotify green
  accent: '#FF0000', // Red accent

  // Dark Theme
  dark: darkTheme,

  // Light Theme
  light: lightTheme,

  // Gradients
  gradient: gradients,

  // Semantic Colors
  ...semanticColors,
};

export const getThemeColors = (isDark: boolean) =>
  isDark ? Colors.dark : Colors.light;
