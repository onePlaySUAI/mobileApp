import { StyleSheet, ViewStyle } from 'react-native';

const LIGHT_THEME_COLORS = {
  background: '#ffffff',
  text: '#333333',
  shadow: '#000',
};

const DARK_THEME_COLORS = {
  background: '#1a1a1a',
  text: '#ffffff',
  shadow: 'transparent',
};

interface PlaceholderStyle {
  songsPlaceHolder: ViewStyle,
  songsContent: ViewStyle,
}

export default function getSongsPlaceholderStyle(isDarkmode: boolean): PlaceholderStyle {
  const COLORS = isDarkmode ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return StyleSheet.create({
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
  })
}