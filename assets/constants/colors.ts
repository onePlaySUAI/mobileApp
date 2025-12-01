// Global color constants for consistent theming across the app

import { darkTheme } from './colors/themes/dark';
import { lightTheme } from './colors/themes/light';
import { gradients } from './colors/gradients';
import { semanticColors } from './colors/semantic';
import { useColorScheme } from 'react-native';

export enum AppTheme { LIGHT, DARK };

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

export function getAppTheme(): AppTheme {
    return useColorScheme() === 'dark' ? AppTheme.DARK : AppTheme.LIGHT;
}

export const THEME_COLORS = {
    [AppTheme.DARK]: Colors.dark ,
    [AppTheme.LIGHT]: Colors.light,
} as const;
