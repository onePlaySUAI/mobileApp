import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface NowPlayingBarStyle {
  container: ViewStyle;
  leftSection: ViewStyle;
  rightSection: ViewStyle;
  albumCover: ViewStyle;
  songInfo: ViewStyle;
  titleContainer: ViewStyle;
  songTitle: TextStyle;
  artistName: TextStyle;
  sourceLogo: ViewStyle;
  actionButton: ViewStyle;
}

export const getNowPlayingBarStyle = (isDarkMode: boolean) => {
  const COLORS = {
    background: '#4A0000', // Dark red background as in design
    text: '#ffffff',
    secondaryText: '#ffffff',
  };

  return StyleSheet.create<NowPlayingBarStyle>({
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
      height: 14,
      width: 14,
      borderRadius: '50%',
    },
    actionButton: {
      padding: 6,
      marginHorizontal: 2,
    },
  });
};
