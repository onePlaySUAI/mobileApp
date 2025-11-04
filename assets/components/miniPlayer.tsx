import { View, Text, TouchableOpacity, Image } from "react-native";
import { getMiniPlayerStyle } from "@/assets/styles/miniPlayer";
import { useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import SpotifyIcon from "./icons/SpotifyIcon";
import AlbumPlaceholderIcon from "./icons/AlbumPlaceholderIcon";

interface MiniPlayerProps {
  song?: {
    title: string;
    artist: string;
    albumCover?: string;
    isPlaying?: boolean;
    isFavorite?: boolean;
  } | null;
  onPlayPause?: () => void;
  onFavorite?: () => void;
}

export default function MiniPlayer({ 
  song, 
  onPlayPause, 
  onFavorite 
}: MiniPlayerProps) {
  const colorScheme = useColorScheme();
  const style = getMiniPlayerStyle(colorScheme === 'dark');

  if (!song) {
    return null;
  }

  return (
    <View style={style.container}>
      <View style={style.leftSection}>
        {song.albumCover ? (
          <Image
            source={{ uri: song.albumCover }}
            style={style.albumCover}
          />
        ) : (
          <View style={[style.albumCover, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#333' }]}>
            <AlbumPlaceholderIcon width={32} height={32} color="#666666" />
          </View>
        )}
        <View style={style.songInfo}>
          <View style={style.titleContainer}>
            <Text style={style.songTitle}>{song.title}</Text>
            <SpotifyIcon width={16} height={16} />
          </View>
          <Text style={style.artistName}>{song.artist}</Text>
        </View>
      </View>
      
      <View style={style.rightSection}>
        <TouchableOpacity onPress={onFavorite} style={style.actionButton}>
          <Ionicons name={song.isFavorite ? "star" : "star-outline"} size={18} color="#ffd700" />
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
