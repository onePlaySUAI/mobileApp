import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const getLibraryTabContentStyle = (isDark: boolean) => {
  const themeColors = isDark ? Colors.dark : Colors.light;

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
