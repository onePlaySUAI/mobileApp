import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const getPlaylistContentStyle = (isDark: boolean) => {
  const themeColors = isDark ? Colors.dark : Colors.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
      marginTop: -10,
    },
    coverContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 80,
    },
    addMusicButton: {
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: themeColors.Button.background,
      alignItems: 'center',
      marginBottom: 12,
    },
    addMusicText: {
      color: themeColors.Button.text,
      fontSize: 12,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
    },
    emptyTitle: {
      color: themeColors.Text.primary,
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 8,
    },
    emptyDescription: {
      color: themeColors.Text.secondary,
      fontSize: 14,
      textAlign: 'center',
    },
  });
};
