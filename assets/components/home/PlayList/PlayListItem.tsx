import React from 'react';
import { TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { SongParams } from '../../song';
import { getPlaylistItemStyle } from '@/assets/styles/playlistItem';
import ThreeDotsIcon from '../../icons/ThreeDotsIcon';
import PlayListCover from './PlayListCover';
import { getThemeColors } from '../../../constants/colors';

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

const PlayListItem = ({
  playlist,
  onPress,
  onDotsPress,
}: PlaylistItemProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = getThemeColors(isDark);
  const styles = getPlaylistItemStyle(isDark);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.coverContainer}>
        <PlayListCover name={playlist.name} size="small" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{playlist.name}</Text>
        <Text style={styles.count}>{playlist.songs.length}</Text>
      </View>
      <TouchableOpacity onPress={onDotsPress} style={styles.dotsContainer}>
        <ThreeDotsIcon
          width={4}
          height={15}
          color={themeColors.Item.optionIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlayListItem;
