// components/PlaylistContent.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Playlist {
  id: string;
  name: string;
  count: string;
  coverGradient?: string[];
}

interface PlaylistContentProps {
  playlist: Playlist;
  onAddMusic?: () => void;
}

const PlaylistContent = ({ playlist, onAddMusic }: PlaylistContentProps) => {
  // Генерируем градиент обложки на основе имени
  const getCoverGradientColors = () => {
    if (playlist.coverGradient) {
      return playlist.coverGradient;
    }

    // Генерируем цвет на основе хеша имени
    const hash = playlist.name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    
    return ['#ccc', '#999', '#666', '#333'];
  };

  const gradientColors = getCoverGradientColors();

  const handleAddMusic = () => {
    console.log('Add music to playlist:', playlist.id);
    onAddMusic?.();
  };

  return (
    <View style={styles.container}>
      {/* Cover Image - градиент */}
      <View style={styles.coverContainer}>
        <View style={[styles.gradientTop, { backgroundColor: gradientColors[0] }]} />
        <View style={[styles.gradientMiddle, { backgroundColor: gradientColors[1] }]} />
        <View style={[styles.gradientBottom, { backgroundColor: gradientColors[2] }]} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add Music Button */}
        <TouchableOpacity 
          style={styles.addMusicButton}
          onPress={handleAddMusic}
        >
          <Text style={styles.addMusicText}>Add music</Text>
        </TouchableOpacity>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎵</Text>
          <Text style={styles.emptyTitle}>No songs yet</Text>
          <Text style={styles.emptyDescription}>
            Start adding songs to your playlist
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  coverContainer: {
    height: 280,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '33%',
  },
  gradientMiddle: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: '34%',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '33%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    flexGrow: 1,
  },
  addMusicButton: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  addMusicText: {
    color: '#999',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});