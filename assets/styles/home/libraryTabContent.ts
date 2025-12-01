import { StyleSheet } from 'react-native';
import { AppTheme, THEME_COLORS } from '@/assets/constants/colors';

export const getLibraryTabContentStyle = (appTheme: AppTheme) => {
  const themeColors = THEME_COLORS[appTheme];

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    addPlaylistButton: {
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: themeColors.Button.background,
      alignItems: 'center',
      marginHorizontal: 16,
      marginVertical: 8,
    },
    addPlaylistText: {
      color: themeColors.Text.primary,
      fontSize: 12,
    },
    list: {
      flex: 1,
    },
    listContent: {
      gap: 8,
      paddingHorizontal: 16,
      paddingBottom: 80,
    },
  });
};
