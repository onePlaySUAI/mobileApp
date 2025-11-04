import { StyleSheet } from 'react-native';

export const getPlaylistItemStyle = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1a1a1a',
      borderRadius: 12,
      padding: 10,
      marginBottom: 8,
    },
    coverContainer: {
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    name: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    count: {
      color: '#888',
      fontSize: 13,
      marginTop: 4,
    },
  });
};