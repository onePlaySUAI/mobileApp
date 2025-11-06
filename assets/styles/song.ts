import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors } from '../constants/colors';

interface SongStyle {
  songContainer: ViewStyle;
  albumTitleContainer: ViewStyle;
  albumCover: ImageStyle;
  title: TextStyle;
  artist: TextStyle;
  sourceContainer: ViewStyle;
  source: ImageStyle;
  sourceYT: ImageStyle;
  dotsStyle: ImageStyle;
}

export const getSongStyle = (isDarkMode: boolean, isActive: boolean) => {
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return StyleSheet.create<SongStyle>({
    songContainer: {
      height: 47,
      borderStyle: 'dashed',
      borderWidth: 2,
      borderColor: themeColors.Header.divider,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors.Item.inActiveBackground,
      borderRadius: 8,
      paddingHorizontal: 6,
    },
    albumTitleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    albumCover: {
      width: 47,
      height: 47,
      borderRadius: 7,
      marginRight: 16,
      backgroundColor: themeColors.Header.divider,
    },
    title: {
      fontSize: 18,
      fontFamily: 'Inter_400Regular',
      color: isActive ? Colors.accent : themeColors.Text.primary,
    },
    artist: {
      fontSize: 11,
      fontFamily: 'Inter_400Regular',
      color: isActive ? Colors.primary : themeColors.Text.secondary,
    },
    sourceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    source: {
      width: 19,
      height: 19,
      margin: 0,
    },
    sourceYT: {
      width: 19,
      height: 12,
    },
    dotsStyle: {
      height: 15,
      width: 20,
      marginRight: 10,
      resizeMode: 'contain',
      tintColor: themeColors.Text.primary,
    },
  });
};
