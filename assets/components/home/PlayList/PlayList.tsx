// components/PlaylistContent.tsx

import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native';
import Song from '../../song';
import EmptyState from '../../emptyState';
import { getPlaylistContentStyle } from '@/assets/styles/playlistContent';
import { Playlist } from './PlayListItem';
import PlaylistCover from './PlayListCover';

interface PlaylistContentProps {
  playlist: Playlist;
  onAddMusic?: () => void;
  openModal: (title: string, artist: string) => void;
  closeModal: () => void;
}

const PlaylistContent = ({
  playlist,
  onAddMusic,
  openModal,
  closeModal,
}: PlaylistContentProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getPlaylistContentStyle(isDark);
  const songs = playlist.songs || [];

  const handleAddMusic = () => {
    console.log('Add music to playlist:', playlist.id);
    onAddMusic?.();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cover */}
        <PlaylistCover
          name={playlist.name}
          size="large"
          onPress={() => console.log('Change playlist cover')}
        />

        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          {/* Add Music Button - с большим отступом от обложки */}
          <TouchableOpacity
            style={styles.addMusicButton}
            onPress={handleAddMusic}
          >
            <Text style={styles.addMusicText}>Add music</Text>
          </TouchableOpacity>

          {/* Empty State или песни */}
          {songs.length === 0 ? (
            <EmptyState isDark={isDark} />
          ) : (
            songs.map((song, index) => (
              <Song
                key={index}
                params={song}
                onDotsPress={() => openModal(song.title, song.artist)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistContent;
