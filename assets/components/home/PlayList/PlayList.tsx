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
import PlaylistCover from './PlayListCover';
import { getPlaylistContentStyle } from '@/assets/styles/playList/playlistContent';
import { PlaylistContentProps } from '@/types/components';

const PlaylistContent = ({
  appTheme,
  playlist,
  onAddMusic,
  openModal,
  closeModal
}: PlaylistContentProps) => {
  const styles = getPlaylistContentStyle(appTheme);
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
            <EmptyState appTheme={appTheme} />
          ) : (
            songs.map((song, index) => (
              <Song
                key={index}
                params={song}
                onDotsPress={() => openModal(song)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistContent;
