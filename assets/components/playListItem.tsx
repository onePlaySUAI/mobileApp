// assets/components/playListItem.tsx

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface Playlist {
  id: string;
  name: string;
  count: string;
}

interface PlaylistItemProps {
  playlist: Playlist;
}

const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  const handlePress = () => {
    router.push({
      pathname: '/PlaylistDetail', // ✅ Правильный путь
      params: { playlist: JSON.stringify(playlist) },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.name}>{playlist.name}</Text>
        <Text style={styles.count}>{playlist.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cover: {
    width: 60,
    height: 60,
    backgroundColor: '#555',
    borderRadius: 8,
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
