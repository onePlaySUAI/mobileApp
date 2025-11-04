import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SongParams } from '../../song';
import { getPlaylistItemStyle } from '@/assets/styles/playlistItem';
import PlaylistCover from './PlaylistCover';

export interface Playlist {
  id: string;
  name: string;
  songs: SongParams[];
}

interface PlaylistItemProps {
  playlist: Playlist;
  onPress?: () => void;
}

const PlaylistItem = ({ playlist, onPress }: PlaylistItemProps) => {
  const styles = getPlaylistItemStyle();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.coverContainer}>
  <PlaylistCover name={playlist.name} size="small" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{playlist.name}</Text>
        <Text style={styles.count}>{playlist.songs.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
