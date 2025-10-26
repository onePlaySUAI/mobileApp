import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface RegisterStyle {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  errorText: TextStyle;
}

const LIGHT_THEME_COLORS = {
  background: '#ffffff',
  text: '#333333',
  inputBg: '#f2f2f2',
  buttonText: '#ffffff',
  placeholder: '#777',
  buttonFallback: '#007bff',
};

const DARK_THEME_COLORS = {
  background: '#1a1a1a',
  text: '#ffffff',
  inputBg: '#333333',
  buttonText: '#ffffff',
  placeholder: '#aaa',
  buttonFallback: '#3399ff',
};

const SPOTIFY_GREEN = '#1DB954';
const YT_RED = '#FF0000';

export const getRegisterStyle = (isDarkMode: boolean) => {
  const COLORS = isDarkMode ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return StyleSheet.create<RegisterStyle>({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 30,
    },
    input: {
      width: '100%',
      backgroundColor: COLORS.inputBg,
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
      color: COLORS.text,
    },
    button: {
      width: '100%',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      overflow: 'hidden',
    },
    buttonText: {
      color: COLORS.buttonText,
      fontWeight: 'bold',
      fontSize: 16,
    },
    errorText: {
      color: '#ff0000',
      alignSelf: 'center'
    },
  });
};

export const GRADIENT_COLORS = [SPOTIFY_GREEN, YT_RED];
export const FALLBACK_BUTTON_COLOR = (isDarkMode: boolean) =>
  isDarkMode ? DARK_THEME_COLORS.buttonFallback : LIGHT_THEME_COLORS.buttonFallback;
