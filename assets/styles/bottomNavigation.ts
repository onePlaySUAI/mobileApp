import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/colors';

interface BottomNavigationStyle {
  container: ViewStyle;
  tab: ViewStyle;
  activeTab: ViewStyle;
  inactiveIcon: TextStyle;
  gradientIcon: ViewStyle;
}

export const getBottomNavigationStyle = (
  isDarkMode: boolean,
  marginBottom: number
) => {
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return StyleSheet.create<BottomNavigationStyle>({
    container: {
      flexDirection: 'row',
      backgroundColor: themeColors.Bottom.background,
      paddingTop: 12,
      paddingBottom: marginBottom + 12,
      paddingHorizontal: 20,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopWidth: 1,
    },
    tab: {
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: themeColors.Bottom.tabActive,
    },
    inactiveIcon: {
      color: themeColors.Bottom.iconInactive,
    },
    gradientIcon: {
      padding: 8,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
