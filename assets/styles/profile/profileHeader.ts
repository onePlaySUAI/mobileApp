import { StyleSheet } from 'react-native';
import { AppTheme, Colors, THEME_COLORS } from '@/assets/constants/colors';

export const getProfileHeaderStyle = (appTheme: AppTheme, topInset: number) => {
  const marginTop = topInset;
  const themeColors = THEME_COLORS[appTheme];

  return StyleSheet.create({
    headerContainer: {
      backgroundColor: themeColors.Header.background,
      paddingTop: marginTop,
      paddingBottom: 16,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 30,
      shadowColor: Colors.light.Text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3, // Android shadow
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 0,
      paddingVertical: 10,
      height: 56,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleMask: {
      fontSize: 24,
      fontWeight: '600',
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
    },
    spacer: {
      width: 40,
    },
  });
};
