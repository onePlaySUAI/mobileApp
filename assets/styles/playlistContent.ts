import { StyleSheet } from 'react-native';

export const getPlaylistContentStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
      marginTop: -10,
    },
    coverContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#1a1a1a',
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 80,
    },
    addMusicButton: {
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#2b2b2b',
      alignItems: 'center',
      marginBottom: 12,
    },
    addMusicText: {
      color: '#ffffff',
      fontSize: 12,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
    },
    emptyTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 8,
    },
    emptyDescription: {
      color: '#888',
      fontSize: 14,
      textAlign: 'center',
    },
  });
};