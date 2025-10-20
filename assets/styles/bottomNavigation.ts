import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BottomNavigationStyle {
  container: ViewStyle;
  tab: ViewStyle;
  activeTab: ViewStyle;
  activeIcon: TextStyle;
  inactiveIcon: TextStyle;
  gradientIcon: ViewStyle;
}

export const getBottomNavigationStyle = (isDarkMode: boolean, marginBottom: number) => {
  const COLORS = {
    background: isDarkMode ? '#1a1a1a' : '#f8f8f8',
    active: '#ff0000',
    inactive: isDarkMode ? '#8e8e93' : '#6d6d70',
  };

  return StyleSheet.create<BottomNavigationStyle>({
    container: {
      flexDirection: 'row',
      backgroundColor: COLORS.background,
      paddingTop: 12,
      paddingBottom: marginBottom + 12,
      paddingHorizontal: 20,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#2c2c2e' : '#e5e5e7',
    },
    tab: {
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: isDarkMode ? '#2c2c2e' : '#e5e5e7',
    },
    activeIcon: {
      color: COLORS.active,
    },
    inactiveIcon: {
      color: COLORS.inactive,
    },
    gradientIcon: {
      padding: 8,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
