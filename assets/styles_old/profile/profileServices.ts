import { StyleSheet } from 'react-native';
import { AppTheme, Colors, THEME_COLORS } from '@/assets/constants/colors';

export const getProfileServicesStyle = (appTheme: AppTheme) => {
  const themeColors = THEME_COLORS[appTheme];
  return StyleSheet.create({
    actions: {
      paddingTop: 18,
      alignItems: 'center',
      gap: 10,
    },
    serviceBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 8,
    },

    spotifyBtn: {
      backgroundColor: themeColors.Text.background,
    },
    youtubeBtn: {
      backgroundColor: themeColors.Text.background,
    },
    serviceIcon: {
      width: 26,
      height: 26,
    },
    spotifyText: {
      color: Colors.spotifyText,
      fontSize: 14,
    },
    youtubeText: {
      color: Colors.youtubeText,
      fontSize: 14,
    },
  });
};
