import React from 'react';
import { TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import ThreeDotsIcon from '../../icons/ThreeDotsIcon';
import PlayListCover from './PlayListCover';
import { getPlaylistItemStyle } from '@/assets/styles_old/playList/playlistItem';
import { PlaylistItemProps } from '@/types/components';
import { THEME_COLORS } from '@/assets/constants/colors';



const PlayListItem = ({
  appTheme,
  playlist,
  onPress,
  onDotsPress,
}: PlaylistItemProps) => {
  const themeColors = THEME_COLORS[appTheme];
  const styles = getPlaylistItemStyle(appTheme);

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
