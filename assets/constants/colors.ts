// Global color constants for consistent theming across the app

// toDo: сделать доступ к темам либо функцией либо мапой (скорее второе)
// и перетащить enum с темами сюда

import { darkTheme } from './colors/themes/dark';
import { lightTheme } from './colors/themes/light';
import { gradients } from './colors/gradients';
import { semanticColors } from './colors/semantic';

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

export const THEME_COLORS = {
    [AppTheme.DARK]: Colors.dark ,
    [AppTheme.LIGHT]: Colors.light,
} as const;
