import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const getPlaylistItemStyle = (isDark: boolean) => {
  const themeColors = isDark ? Colors.dark : Colors.light;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.Item.inActiveBackground,
      borderRadius: 12,
      padding: 10,
      marginBottom: 8,
    },
    coverContainer: {
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    name: {
      color: themeColors.Text.primary,
      fontSize: 16,
      fontWeight: '500',
    },
    count: {
      color: themeColors.Text.secondary,
      fontSize: 13,
      marginTop: 4,
    },
    dotsContainer: {
      padding: 5,
    },
  });
};
