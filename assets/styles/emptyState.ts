import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const getEmptyStateStyle = (isDark: boolean) => {
  const themeColors = isDark ? Colors.dark : Colors.light;

  return StyleSheet.create({
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
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