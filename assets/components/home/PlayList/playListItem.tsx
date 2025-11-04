import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SongParams } from '../../song';
import { getPlaylistItemStyle } from '@/assets/styles/playlistItem';
import PlaylistCover from './PlaylistCover';
import ThreeDotsIcon from '../../icons/dotsIcon';

export interface Playlist {
  id: string;
  name: string;
  songs: SongParams[];
}

interface PlaylistItemProps {
  playlist: Playlist;
  onPress?: () => void;
  onDotsPress?: () => void;
}

const PlaylistItem = ({ playlist, onPress, onDotsPress }: PlaylistItemProps) => {
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
      <TouchableOpacity onPress={onDotsPress} style={styles.dotsContainer}>
        <ThreeDotsIcon width={4} height={15} color="#D9D9D9" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
