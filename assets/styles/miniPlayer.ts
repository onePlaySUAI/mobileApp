import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors } from '../constants/colors';

interface MiniPlayerStyle {
  container: ViewStyle;
  leftSection: ViewStyle;
  rightSection: ViewStyle;
  albumCover: ImageStyle;
  songInfo: ViewStyle;
  titleContainer: ViewStyle;
  songTitle: TextStyle;
  artistName: TextStyle;
  sourceLogo: ImageStyle;
  actionButton: ViewStyle;
}

export const getMiniPlayerStyle = (isDarkMode: boolean) => {
  const COLORS = {
    background: Colors.accent,
    text: Colors.dark.Text.primary,
    secondaryText: Colors.dark.Text.primary,
  };

  return StyleSheet.create<MiniPlayerStyle>({
    container: {
      flexDirection: 'row',
      backgroundColor: COLORS.background,
      paddingHorizontal: 12,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 12,
      marginHorizontal: 24,
      marginVertical: 8,
      alignSelf: 'center',
      maxWidth: '90%',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    albumCover: {
      width: 40,
      height: 40,
      borderRadius: 6,
      marginRight: 8,
      resizeMode: 'cover',
    },
    songInfo: {
      flex: 1,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    songTitle: {
      color: COLORS.text,
      fontSize: 14,
      fontWeight: '600',
      marginRight: 6,
    },
    artistName: {
      color: COLORS.secondaryText,
      fontSize: 12,
    },
    sourceLogo: {
      width: 14,
      height: 14,
      resizeMode: 'contain',
    },
    actionButton: {
      padding: 6,
      marginHorizontal: 2,
    },
  });
};
