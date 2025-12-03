import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface NowPlayingBarStyle {
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
  controls: ViewStyle;
  controlButton: ViewStyle;
  transitionContainer: ViewStyle;   // added
}

interface FullScreenPlayerStyle {
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
  controls: ViewStyle;
  controlButton: ViewStyle;
  transitionContainer: ViewStyle;   // added
}

export const getNowPlayingBarStyle = (isDarkMode: boolean) => {
  const COLORS = {
    background: '#4A0000',
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
      borderRadius: 7,
    },
    actionButton: {
      padding: 6,
      marginHorizontal: 2,
    },
    controls: {
      display: 'none',
    },
    controlButton: {
      display: 'none',
    },
    transitionContainer: {
      transitionProperty: 'all',
      transitionDuration: '1000ms',
      transitionTimingFunction: 'ease-in-out',
    },
  });
};

export const getFullScreenStyle = (isDarkmode: boolean): FullScreenPlayerStyle => {
  const COLORS = {
    background: isDarkmode ? '#1a1a1a' : '#ffffff',
    text: isDarkmode ? '#ffffff' : '#000000',
    secondaryText: isDarkmode ? '#cccccc' : '#555555',
  };

  return StyleSheet.create<FullScreenPlayerStyle>({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: COLORS.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    leftSection: {
      display: 'none', // not used in fullscreen
    },
    rightSection: {
      display: 'none',
    },
    albumCover: {
      width: '80%',
      aspectRatio: 1,
      borderRadius: 12,
      marginBottom: 24,
    },
    songInfo: {
      alignItems: 'center',
      marginBottom: 32,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    songTitle: {
      color: COLORS.text,
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      marginRight: 6,
    },
    artistName: {
      color: COLORS.secondaryText,
      fontSize: 18,
      textAlign: 'center',
      marginTop: 4,
    },
    sourceLogo: {
      height: 24,
      width: 24,
      borderRadius: 12,
    },
    actionButton: {
      padding: 12,
      marginHorizontal: 8,
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 50,
      width: '100%',
      marginTop: 16,
      boxSizing: 'border-box',
    },
    controlButton: {
      padding: 16,
      marginHorizontal: 12,
    },
    transitionContainer: {
      transitionProperty: 'all',
      transitionDuration: '300ms',
      transitionTimingFunction: 'ease-in-out',
    },
  });
};
