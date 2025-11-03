import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

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
  const COLORS = {
    background: isDarkMode ? '#000' : '#f8f8f8',
    searchBackground: isDarkMode ? '#2a2a2a' : '#e5e5e7',
    text: isDarkMode ? '#ffffff' : '#000000',
    title: isDarkMode ? '#ffffff' : '#000000',
    searchPlaceholder: '#ff0000',
    searchButton: '#00ff00',
  };

  return StyleSheet.create<HeaderStyle>({
    container: {
      backgroundColor: COLORS.background,
      paddingTop: marginTop,
      paddingBottom: 16,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 30,
      shadowColor: '#000',
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
      backgroundColor: '#8e8e93',
    },
    title: {
      color: COLORS.title,
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
      color: COLORS.text,
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.searchPlaceholder,
      paddingVertical: 4,
      marginRight: 12,
    },
    libaryInput: {
      flex: 1,
      color: COLORS.searchPlaceholder,
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