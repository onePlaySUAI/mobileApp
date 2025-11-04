import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface AppStyle {
  safeAreaProvider: ViewStyle,
  container: ViewStyle,
  Tab: ViewStyle,
  text: TextStyle,
  songsPlaceHolder: ViewStyle,
  songsContent: ViewStyle,
}

const LIGHT_THEME_COLORS = {
  background: '#ffffff',
  text: '#333333',
  shadow: '#000',
};

const DARK_THEME_COLORS = {
  background: '#1a1a1a', // Darker background to match Figma design
  text: '#ffffff',
  shadow: 'transparent',
};

export const getHomeStyle = (isDarkMode: boolean) => {
  const COLORS = isDarkMode ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return StyleSheet.create<AppStyle>({
    safeAreaProvider: {
      backgroundColor: COLORS.background,
    },
    songsPlaceHolder: {
      flex: 1,
      width: '100%',
      backgroundColor: COLORS.background,
    },
    songsContent: {
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: 10,
    },
    Tab: {
      flex: 1,
      marginTop: 10,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      shadowColor: COLORS.shadow,
    },
    text: {
      color: COLORS.text,
    }
  })
}

