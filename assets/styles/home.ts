import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface AppStyle {
  container: ViewStyle,
  text: TextStyle,
}

const LIGHT_THEME_COLORS = {
  background: '#ffffff',
  text: '#333333',
  shadow: '#000',
};

const DARK_THEME_COLORS = {
  background: '#282828',
  text: '#ffffff',
  shadow: 'transparent',
};

export const getHomeStyle = (isDarkMode: boolean) => {
  const COLORS = isDarkMode ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return StyleSheet.create<AppStyle>({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: COLORS.background,
      shadowColor: COLORS.shadow,
    },
    text: {
      color: COLORS.text,
    }
  })
}

