import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const getProfileStyle = (isDark: boolean) => {
  const themeColors = isDark ? Colors.dark : Colors.light;

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
