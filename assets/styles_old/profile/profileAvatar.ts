import { StyleSheet } from 'react-native';
import { AppTheme, Colors, THEME_COLORS } from '@/assets/constants/colors';

export const getProfileAvatarStyle = (appTheme: AppTheme) => {
  const themeColors = THEME_COLORS[appTheme];

  return StyleSheet.create({
    avatarWrap: {
      alignItems: 'center',
      paddingTop: 24,
    },
    avatarCircle: {
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: themeColors.Text.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    plusWrap: {
      width: 140,
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    plus: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 12,
      transform: [{ rotate: '0deg' }],
    },
  });
};
