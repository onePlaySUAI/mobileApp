import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import PlaylistItem from '../playListItem';


interface Playlist {
  id: string;
  name: string;
  count: string;
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
