import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import PlaylistItem, { Playlist } from './PlayList/playListItem';

interface PlayListItemProps {
  id: string;
  playlist: Playlist;
}

interface LibraryTabContentProps {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
  onAddPlaylist: () => void;
}

const LibraryTabContent = ({ 
  playlists, 
  onPlaylistPress, 
  onAddPlaylist 
}: LibraryTabContentProps) => {
  return (
    <View style={styles.container}>
      {/* Кнопка "Add playlist" */}
      <TouchableOpacity 
        style={styles.addPlaylistButton} 
        onPress={onAddPlaylist}
      >
        <Text style={styles.addPlaylistText}>Add playlist</Text>
      </TouchableOpacity>

      {/* Список плейлистов */}
      <ScrollView 
        style={styles.list} 
        contentContainerStyle={styles.listContent}
      >
        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            onPress={() => onPlaylistPress(playlist)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default LibraryTabContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addPlaylistButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  addPlaylistText: {
    color: '#ffffff',
    fontSize: 12,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});
