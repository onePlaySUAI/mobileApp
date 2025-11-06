import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

// Порефакторить

const LIGHT_THEME = {
  containerBackground: Colors.light.OptionsModal.background,
  textPrimary: Colors.light.OptionsModal.text,
  textSecondary: Colors.light.OptionsModal.secondaryText,
  divider: Colors.light.OptionsModal.divider,
  buttonBackground: Colors.light.Button.background,
};

const DARK_THEME = {
  containerBackground: Colors.dark.OptionsModal.background,
  textPrimary: Colors.dark.OptionsModal.text,
  textSecondary: Colors.dark.OptionsModal.secondaryText,
  divider: Colors.dark.OptionsModal.divider,
  buttonBackground: Colors.dark.Button.background,
};

export default function getModalStyles(isDark: boolean, paddingBottom: number) {
  const COLORS = isDark ? DARK_THEME : LIGHT_THEME;

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    container: {
      width: '100%',
      backgroundColor: COLORS.containerBackground,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
      paddingBottom: paddingBottom + 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.textPrimary,
      marginBottom: 4,
      textAlign: 'center',
    },
    artist: {
      fontSize: 14,
      color: COLORS.textSecondary,
      marginBottom: 16,
      textAlign: 'center',
    },
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: COLORS.divider,
      marginBottom: 16,
    },
    optionButton: {
      width: '100%',
      paddingVertical: 12,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      color: COLORS.textPrimary,
    },
    closeButton: {
      marginTop: 20,
      paddingVertical: 10,
      width: '100%',
      alignItems: 'center',
      backgroundColor: COLORS.buttonBackground,
      borderRadius: 8,
    },
    closeText: {
      color: COLORS.textPrimary,
      fontWeight: '500',
    },
  });
}
