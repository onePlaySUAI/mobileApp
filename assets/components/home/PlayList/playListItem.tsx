// assets/components/playListItem.tsx

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { songParams } from '../../song';

export interface Playlist {
  id: string;
  name: string;
  songs: songParams[];
}

interface PlaylistItemProps {
  playlist: Playlist;
  onPress?: () => void;
}

const PlaylistItem = ({ playlist, onPress }: PlaylistItemProps) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.name}>{playlist.name}</Text>
        <Text style={styles.count}>{playlist.songs.length}</Text>
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
