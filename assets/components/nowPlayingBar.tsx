import { View, Text, TouchableOpacity, Image } from "react-native";
import { getNowPlayingBarStyle } from "@/assets/styles/nowPlayingBar";
import { useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface NowPlayingBarProps {
  song?: {
    title: string;
    artist: string;
    albumCover?: string;
    isPlaying?: boolean;
  } | null;
  onPlayPause?: () => void;
  onFavorite?: () => void;
}

export default function NowPlayingBar({ 
  song, 
  onPlayPause, 
  onFavorite 
}: NowPlayingBarProps) {
  const colorScheme = useColorScheme();
  const style = getNowPlayingBarStyle(colorScheme === 'dark');

  if (!song) {
    return null;
  }

  return (
    <View style={style.container}>
      <View style={style.leftSection}>
        <Image 
          source={{ uri: song.albumCover || require('@/assets/images/albumBlank.jpg') }} 
          style={style.albumCover} 
        />
        <View style={style.songInfo}>
          <View style={style.titleContainer}>
            <Text style={style.songTitle}>{song.title}</Text>
            <Image 
              source={require('@/assets/images/spotifyLogo.png')} 
              style={style.sourceLogo} 
            />
          </View>
          <Text style={style.artistName}>{song.artist}</Text>
        </View>
      </View>
      
      <View style={style.rightSection}>
        <TouchableOpacity onPress={onFavorite} style={style.actionButton}>
          <Ionicons name="star" size={18} color="#ffd700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause} style={style.actionButton}>
          <Ionicons 
            name={song.isPlaying ? "pause" : "play"} 
            size={18} 
            color="#ffffff" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
