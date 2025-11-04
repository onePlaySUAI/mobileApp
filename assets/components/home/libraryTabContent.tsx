import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PlaylistItem, { Playlist } from './playlist/playlistItem';
import { getLibraryTabContentStyle } from '@/assets/styles/libraryTabContent';

interface LibraryTabContentProps {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
  onAddPlaylist: () => void;
  onDotsPress: (playlist: Playlist) => void;
}

const LibraryTabContent = ({
  playlists,
  onPlaylistPress,
  onAddPlaylist,
  onDotsPress
}: LibraryTabContentProps) => {
  const styles = getLibraryTabContentStyle();

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
          <PlaylistItem
            key={playlist.id}
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
