import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface HeaderStyle {
  container: ViewStyle;
  text: TextStyle;
}

// The marginTop comes from safe area insets passed from the component.
export const getHeaderStyle = (isDarkMode: boolean, marginTop: number) => {
  const COLORS = {
    background: isDarkMode ? '#1c1c1e' : '#f8f8f8',
    text: isDarkMode ? '#ff0000' : '#b62020',
    accent: isDarkMode ? '#007aff' : '#007aff',
  };

  return StyleSheet.create<HeaderStyle>({
    container: {
      backgroundColor: COLORS.background,
      paddingTop: marginTop,
      paddingBottom: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3, // Android shadow
    },
    text: {
      color: COLORS.text,
      fontSize: 22,
      fontWeight: '600',
    },
  });
};
