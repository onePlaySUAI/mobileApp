import { StyleSheet } from 'react-native';

export const getPlaylistHeaderStyle = (isDark: boolean, topInset: number) => {
  const marginTop = topInset;
  const COLORS = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    borderColor: isDark ? '#38383a' : '#e5e5e5',
  };

  return StyleSheet.create({
    headerContainer: {
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
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 0,
      paddingVertical: 10,
      height: 56,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonText: {
      fontSize: 24,
      color: COLORS.text,
      fontWeight: '400',
    },
    titleMask: {
      fontSize: 20,
      fontWeight: '600',
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
    },
    spacer: {
      width: 40,
    },
  });
};