import { AppTheme, THEME_COLORS } from '@/assets/constants/colors';
import { StyleSheet } from 'react-native';

export const getProfileStyle = (appTheme: AppTheme) => {
  const themeColors = THEME_COLORS[appTheme];

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    keyboardView: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: themeColors.background,
    },
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
  });
};
