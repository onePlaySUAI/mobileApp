import {StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';

interface SongStyle {
  songContainer: ViewStyle,

  albumTitleContainer: ViewStyle,
  albumCover: ImageStyle,
  title: TextStyle,
  artist: TextStyle,

  sourceContainer: ViewStyle,
  source: ImageStyle,
  sourceYT: ImageStyle,
  dotsStyle: ImageStyle,
}

export const getSongStyle = (isDarkMode: boolean, isActive=false) => {

  return StyleSheet.create<SongStyle>({
    songContainer: {
      height: 47,
      borderStyle: 'dashed',
      borderWidth: 2,
      borderColor: '#fff',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    albumTitleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      fontSize: 19,
      fontFamily: 'Inter_400Regular',
      color: (isActive ? '#FF0000' : '#fff'),
    },
    artist: {
      fontSize: 10,
      fontFamily: 'Inter_400Regular',
      color: (isActive ? '#1DB954' : 'gray'),
    },
    albumCover: {
      width: 47,
      height: 47,
      borderRadius: 7,
      marginRight: 16,
      backgroundColor: 'gray',
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
    },
  })
}