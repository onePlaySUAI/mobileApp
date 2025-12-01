import { StyleSheet } from 'react-native';
import { AppTheme, THEME_COLORS } from '@/assets/constants/colors';
import { AppStyle } from '@/types/components';

export const getHomeStyle = (appTheme: AppTheme) => {
  
  const COLORS = THEME_COLORS[appTheme];

  return StyleSheet.create<AppStyle>({
    safeAreaProvider: {
      backgroundColor: COLORS.background,
    },
    songsPlaceHolder: {
      flex: 1,
      width: '100%',
      backgroundColor: COLORS.background,
    },
    songsContent: {
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: 10,
    },
    Tab: {
      flex: 1,
      marginTop: 10,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      shadowColor: COLORS.Text.primary,
    },
    text: {
      color: COLORS.Text.primary,
    },
  });
};
