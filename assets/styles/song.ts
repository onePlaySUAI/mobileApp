import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

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

const LIGHT_THEME = {
  border: '#ccc',
  title: '#000',
  artist: '#555',
  background: '#f8f8f8',
  activeTitle: '#FF0000',
  activeArtist: '#1DB954',
};

const DARK_THEME = {
  border: '#444',
  title: '#fff',
  artist: '#aaa',
  background: 'inherit',
  activeTitle: '#FF5555',
  activeArtist: '#1DB954',
};

export const getSongStyle = (isDarkMode: boolean, isActive: boolean) => {
  const COLORS = isDarkMode ? DARK_THEME : LIGHT_THEME;

  return StyleSheet.create<SongStyle>({
    songContainer: {
      height: 47,
      borderStyle: 'dashed',
      borderWidth: 2,
      borderColor: COLORS.border,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: COLORS.background,
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
      backgroundColor: COLORS.border,
    },
    title: {
      fontSize: 18,
      fontFamily: 'Inter_400Regular',
      color: isActive ? COLORS.activeTitle : COLORS.title,
    },
    artist: {
      fontSize: 11,
      fontFamily: 'Inter_400Regular',
      color: isActive ? COLORS.activeArtist : COLORS.artist,
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
      tintColor: COLORS.title,
    },
  });
};
