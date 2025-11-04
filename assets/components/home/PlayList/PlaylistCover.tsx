import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

interface PlaylistCoverProps {
  name: string;
  size?: 'small' | 'large';
  customImage?: string;
  onPress?: () => void;
}


import { useColorScheme, Dimensions } from 'react-native';

const PlaylistCover = ({
  name,
  size = 'small',
  customImage,
  onPress,
}: PlaylistCoverProps) => {
  const isLarge = size === 'large';
  // Sizes tuned to match Figma "PlayListIn"
  const screenWidth = Dimensions.get('window').width;
  const HORIZONTAL_PADDING = 16; // matches parent content padding
  const coverSize = isLarge ? screenWidth : 56; // small thumbnails 56, large use full screen width
  const coverWidth = coverSize;
  const coverHeight = coverSize; // always square
  const colorScheme = useColorScheme();

  // Темные градиенты для dark theme
  const getGradientColors = (): readonly [string, string] => {
    if (customImage) return ['transparent', 'transparent'];

    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (colorScheme === 'dark') {
      // Темные цветные варианты для темной темы
      const gradients: readonly [string, string][] = [
        ['#388E3C', '#282828'], // Темно-зеленый
        ['#D32F2F', '#282828'], // Темно-красный
        ['#7B1FA2', '#282828'], // Темно-фиолетовый
        ['#1976D2', '#282828'], // Темно-синий
        ['#F57C00', '#282828'], // Темно-оранжевый
        ['#5D4037', '#282828'], // Темно-коричневый
      ];
      return gradients[hash % gradients.length];
    } else {
      // Яркие варианты для светлой темы
      const gradients: readonly [string, string][] = [
        ['#1DB954', '#282828'], // Spotify green to gray
        ['#FF6B6B', '#282828'], // Red to gray
        ['#A8E6CF', '#282828'], // Mint to gray
        ['#DDA0DD', '#282828'], // Plum to gray
        ['#87CEEB', '#282828'], // Sky blue to gray
        ['#FFA07A', '#282828'], // Light salmon to gray
      ];
      return gradients[hash % gradients.length];
    }
  };

  const getInitial = () => {
    return name.charAt(0).toUpperCase();
  };

  const styles = StyleSheet.create({
    container: {
      width: coverWidth,
      height: coverHeight,
      borderRadius: isLarge ? 0 : 8,
      overflow: 'hidden',
      position: 'relative',
      borderWidth: colorScheme === 'dark' ? 1 : 0,
      borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)',
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      // subtle shadow for thumbnails (only for small)
      shadowColor: '#000',
      shadowOffset: { width: 0, height: isLarge ? 0 : 2 },
      shadowOpacity: colorScheme === 'dark' ? (isLarge ? 0 : 0.45) : (isLarge ? 0 : 0.12),
      shadowRadius: isLarge ? 0 : 4,
      elevation: isLarge ? 0 : (colorScheme === 'dark' ? 6 : 2),
    },
    baseContent: {
      width: '100%',
      height: '100%',
    },
    gradient: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      pointerEvents: 'none',
    },
    initial: {
      position: 'absolute',
      zIndex: 2,
      fontSize: isLarge ? 120 : 24,
      fontWeight: '700',
      color: colorScheme === 'dark' ? '#eaeaea' : '#fff',
      textShadowColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
    },
    customImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });



  const Container = onPress ? TouchableOpacity : View;

  const overlayColors: readonly [string, string] = isLarge ? ['transparent', '#1a1a1a'] : ['transparent', 'transparent'];
  const overlayLocations: readonly [number, number] = [0.3, 1];

  return (
    <Container style={styles.container} onPress={onPress}>
      {/* base: image or generated gradient */}
      <View style={styles.baseContent}>
        {customImage ? (
          <Image source={{ uri: customImage }} style={styles.customImage} />
        ) : (
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        )}
      </View>

      {/* overlay to mimic Spotify-style fade (transparent -> dark) */}
      <LinearGradient
        colors={overlayColors}
        locations={overlayLocations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.overlay}
      />

      {/* initial on top */}
      <Text style={styles.initial}>{getInitial()}</Text>
    </Container>
  );
};

export default PlaylistCover;