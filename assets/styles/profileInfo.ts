import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const getProfileInfoStyle = (isDark: boolean) => {
  const themeColors = isDark ? Colors.dark : Colors.light;

  const styles = StyleSheet.create({
    nameBlock: {
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 16,
    },
    name: {
      color: themeColors.Text.primary,
      fontSize: 22,
      fontWeight: '600',
    },
    nameInput: {
      color: themeColors.Text.primary,
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      minWidth: 200,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.Text.secondary,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: themeColors.Text.background,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 12,
      gap: 10,
    },
    label: {
      color: themeColors.Text.primary,
      fontSize: 14,
    },
    input: {
      color: themeColors.Text.primary,
      fontSize: 14,
      minWidth: 160,
    },
  });

  return { styles, colors: themeColors };
};
