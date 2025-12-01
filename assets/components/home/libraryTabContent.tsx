import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { getLibraryTabContentStyle } from '@/assets/styles/home/libraryTabContent';
import { LibraryTabContentProps } from '@/types/components';
import PlayListItem from "./PlayList/PlayListItem";

const LibraryTabContent = ({
  appTheme,
  playlists,
  onPlaylistPress,
  onAddPlaylist,
  onDotsPress,
}: LibraryTabContentProps) => {
  const styles = getLibraryTabContentStyle(appTheme);

  return (
    <View style={styles.container}>
      {/* Add playlist button */}
      <TouchableOpacity
        style={styles.addPlaylistButton}
        onPress={onAddPlaylist}
      >
        <Text style={styles.addPlaylistText}>Add playlist</Text>
      </TouchableOpacity>

      {/* Playlists list */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {playlists.map((playlist) => (
          <PlayListItem
            key={playlist.id}
            appTheme={appTheme}
            playlist={playlist}
            onPress={() => onPlaylistPress(playlist)}
            onDotsPress={() => onDotsPress(playlist)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default LibraryTabContent;
