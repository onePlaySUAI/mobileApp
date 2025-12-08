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
import { getPlaylistContentStyle } from '@/assets/styles_old/playList/playlistContent';
import { PlaylistContentProps } from '@/types/components';
import { selectCurrentSong, SongType } from '@/store/songsSlice';
import SongsPlaceholder from '../songsPlaceholder';
import { AppTheme } from '@/assets/constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export interface Playlist {
  id: string;
  name: string;
  songs: SongType[];
}

const PlaylistContent = ({
  appTheme,
  playlist,
  onAddMusic,
  openModal,
}: PlaylistContentProps) => {
  const styles = getPlaylistContentStyle(appTheme);
  const songs = playlist.songs || [];
  const nowPlayingSong = useSelector((state: RootState) => selectCurrentSong(state.song));
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
            <SongsPlaceholder
                isDarkmode={appTheme == AppTheme.DARK}
                nowPlayingSongId={nowPlayingSong?.id ?? ''}
                openModal={openModal}
                songs={songs}
              />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistContent;
