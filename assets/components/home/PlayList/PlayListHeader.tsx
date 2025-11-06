import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useState } from 'react';
import BackIcon from '../../icons/BackIcon';
import { getPlaylistHeaderStyle } from '@/assets/styles/playlistHeader';
import PlayListPauseIcon from '../../icons/PlayListPauseIcon';
import PlayListStartIcon from '../../icons/PlayListStartIcon';
import { Colors } from '../../../constants/colors';

interface PlayListHeaderProps {
  onBack?: () => void;
  title?: string;
  onPlayPause?: (isPlaying: boolean) => void;
}

export default function PlayListHeader({
  title,
  onBack = () => {},
  onPlayPause = () => {},
}: PlayListHeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = getPlaylistHeaderStyle(isDark, insets.top);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    onPlayPause(newIsPlaying);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <MaskedView maskElement={<Text style={styles.titleMask}>{title}</Text>}>
          <LinearGradient
            colors={Colors.gradient.rainbow}
            locations={[0, 0.35, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
          </LinearGradient>
        </MaskedView>
        <TouchableOpacity onPress={handlePlayPause} style={styles.backButton}>
          {isPlaying ? <PlayListPauseIcon /> : <PlayListStartIcon />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
