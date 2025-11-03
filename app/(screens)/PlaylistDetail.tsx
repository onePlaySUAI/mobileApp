// app/(screens)/PlaylistDetail.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

interface Playlist {
  id: string;
  name: string;
  count: string;
  coverGradient?: string[];
}

export default function PlaylistDetailScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { playlist } = useLocalSearchParams();
  const [playlistData, setPlaylistData] = useState<Playlist | null>(null);

  useEffect(() => {
    if (playlist) {
      try {
        const parsed = JSON.parse(decodeURIComponent(playlist as string));
        setPlaylistData(parsed);
      } catch (e) {
        console.error('Failed to parse playlist', e);
      }
    }
  }, [playlist]);

  if (!playlistData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Определяем цвета заголовка на основе имени плейлиста
  const getTitleColors = () => {
    if (playlistData.name.toLowerCase().includes('liked')) {
      return { 
        first: '#ff3b3b', 
        second: '#22c55e', 
        firstName: 'Liked', 
        secondName: ' Songs' 
      };
    }
    
    return { 
      first: '#fff', 
      second: '', 
      firstName: playlistData.name, 
      secondName: '' 
    };
  };

  // Генерируем градиент обложки на основе имени
  const getCoverGradientColors = () => {
    if (playlistData.coverGradient) {
      return playlistData.coverGradient;
    }

    // Генерируем цвет на основе хеша имени
    const hash = playlistData.name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    
    return ['#ccc', '#999', '#666', '#333'];
  };

  const titleColors = getTitleColors();
  const gradientColors = getCoverGradientColors();

  const handleAddMusic = () => {
    // Здесь будет логика добавления музыки
    console.log('Add music to playlist:', playlistData.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={[styles.titleText, { color: titleColors.first }]}>
            {titleColors.firstName}
          </Text>
          {titleColors.secondName && (
            <Text style={[styles.titleText, { color: titleColors.second }]}>
              {titleColors.secondName}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>
      </View>

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

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <View style={styles.barsIcon}>
              <View style={styles.bar} />
              <View style={styles.bar} />
              <View style={styles.bar} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    color: '#ff3b3b',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerTitle: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 2,
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
  bottomNavContainer: {
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#000',
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
  barsIcon: {
    flexDirection: 'row',
    gap: 4,
  },
  bar: {
    width: 4,
    height: 28,
    backgroundColor: '#f97316',
    borderRadius: 2,
  },
});