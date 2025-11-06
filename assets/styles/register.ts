import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/colors';

interface RegisterStyle {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  passwordContainer: ViewStyle;
  showHideButton: ViewStyle;
  showHideText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  errorText: TextStyle;
  loginLink: ViewStyle;
  loginText: TextStyle;
}

const SPOTIFY_GREEN = Colors.primary;
const YT_RED = Colors.error;

export const getRegisterStyle = (isDarkMode: boolean) => {
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const styles = StyleSheet.create<RegisterStyle>({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themeColors.Text.primary,
      marginBottom: 30,
    },
    input: {
      width: '100%',
      backgroundColor: themeColors.background,
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
      color: themeColors.Text.primary,
    },
    passwordContainer: {
      width: '100%',
      position: 'relative',
      marginBottom: 15,
    },
    showHideButton: {
      position: 'absolute',
      right: 12,
      top: 12,
    },
    showHideText: {
      color: themeColors.Text.tertiary,
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
      color: themeColors.background,
      fontWeight: 'bold',
      fontSize: 16,
    },
    errorText: {
      color: Colors.error,
      alignSelf: 'center',
    },
    loginLink: {
      marginTop: 20,
    },
    loginText: {
      color: themeColors.Text.tertiary,
      textDecorationLine: 'underline',
    },
  });

  return { styles, colors: themeColors };
};

export const GRADIENT_COLORS = [SPOTIFY_GREEN, YT_RED];
export const FALLBACK_BUTTON_COLOR = Colors.info;
