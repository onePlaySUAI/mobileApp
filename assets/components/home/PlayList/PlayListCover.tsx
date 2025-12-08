import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../../constants/colors';

interface PlaylistCoverProps {
  name: string;
  size?: 'small' | 'large';
  customImage?: string;
  onPress?: () => void;
}

const PlayListCover = ({
  name,
  size = 'small',
  customImage,
  onPress,
}: PlaylistCoverProps) => {
  const isLarge = size === 'large';
  // Sizes tuned to match Figma "PlayListIn"
  const screenWidth = Dimensions.get('window').width;
  const coverSize = isLarge ? screenWidth : 56; // small thumbnails 56, large use full screen width
  const coverWidth = coverSize;
  const coverHeight = coverSize; // always square
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Темные градиенты для dark theme
  const getGradientColors = (): readonly [string, string] => {
    if (customImage) return ['transparent', 'transparent'];

    const hash = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (isDark) {
      return Colors.gradient.playlistDark[
        hash % Colors.gradient.playlistDark.length
      ];
    } else {
      return Colors.gradient.playlistLight[
        hash % Colors.gradient.playlistLight.length
      ];
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
      borderWidth: isLarge ? 0 : 1,
      borderColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)',
      backgroundColor: isDark
        ? Colors.dark.background
        : Colors.light.background,
      justifyContent: 'center',
      alignItems: 'center',
      // subtle shadow for thumbnails (only for small)
      shadowColor: Colors.light.Text.primary,
      shadowOffset: { width: 0, height: isLarge ? 0 : 2 },
      shadowOpacity: isDark ? (isLarge ? 0 : 0.45) : isLarge ? 0 : 0.12,
      shadowRadius: isLarge ? 0 : 4,
      elevation: isLarge ? 0 : isDark ? 6 : 2,
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
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 4,
    },
    customImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });

  const Container = onPress ? TouchableOpacity : View;

  const overlayColors: readonly [string, string] = isLarge
    ? ['transparent', isDark ? Colors.dark.background : Colors.light.background]
    : ['transparent', 'transparent'];
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

export default PlayListCover;
