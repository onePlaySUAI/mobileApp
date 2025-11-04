import { StyleSheet } from 'react-native';

export const getLibraryTabContentStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    addPlaylistButton: {
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#2b2b2b',
      alignItems: 'center',
      marginHorizontal: 16,
      marginVertical: 8,
    },
    addPlaylistText: {
      color: '#ffffff',
      fontSize: 12,
    },
    list: {
      flex: 1,
    },
    listContent: {
      gap: 8,
      paddingHorizontal: 16,
      paddingBottom: 80,
    },
  });
};