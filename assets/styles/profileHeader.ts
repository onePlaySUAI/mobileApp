import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ProfileHeaderStyle {
  container: ViewStyle;
  searchContainer: ViewStyle;
  backBtn: ViewStyle;
  backIcon: TextStyle;
  searchInput: TextStyle;
  searchButton: ViewStyle;
}

export const getProfileHeaderStyle = (isDarkMode: boolean, marginTop: number) => {
  const COLORS = {
    background: isDarkMode ? '#000' : '#f8f8f8',
    searchBackground: isDarkMode ? '#2a2a2a' : '#e5e5e7',
    text: isDarkMode ? '#ffffff' : '#000000',
    title: isDarkMode ? '#ffffff' : '#000000',
    searchPlaceholder: '#ff0000',
    searchButton: '#00ff00',
  };

  return StyleSheet.create<ProfileHeaderStyle>({
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 8,
    },
    backBtn: {
      padding: 8,
      marginRight: 6,
    },
    backIcon: {
      color: '#ff3b30',
      fontSize: 20,
      fontWeight: '700',
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
    searchButton: {
      padding: 4,
    },
  });
};
