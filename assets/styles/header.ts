import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/colors';

interface HeaderStyle {
  container: ViewStyle;
  headerTop: ViewStyle;
  circle: ViewStyle;
  title: TextStyle;
  searchContainer: ViewStyle;
  searchInput: TextStyle;
  libaryInput: TextStyle;
  searchButton: ViewStyle;
}

// The marginTop comes from safe area insets passed from the component.
export const getHeaderStyle = (isDarkMode: boolean, marginTop: number) => {
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return StyleSheet.create<HeaderStyle>({
    container: {
      backgroundColor: themeColors.Header.background,
      paddingTop: marginTop,
      paddingBottom: 16,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 30,
      shadowColor: Colors.light.Text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3, // Android shadow
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    circle: {
      width: 35,
      height: 35,
      borderRadius: 40,
      marginRight: 12,
      backgroundColor: themeColors.Header.icon,
    },
    title: {
      color: Colors.accent,
      fontSize: 18,
      fontWeight: '600',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 8,
    },
    searchInput: {
      flex: 1,
      color: Colors.accent,
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.accent,
      paddingVertical: 4,
      marginRight: 12,
    },
    libaryInput: {
      flex: 1,
      color: Colors.accent,
      fontSize: 20,
      paddingVertical: 4,
      marginLeft: 7,
      marginRight: 12,
    },
    searchButton: {
      padding: 4,
    },
  });
};
