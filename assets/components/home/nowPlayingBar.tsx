import {View, Text, TouchableOpacity, Image} from "react-native";
import {getNowPlayingBarStyle} from "@/assets/styles/nowPlayingBar";
import {useColorScheme} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {Audio} from "expo-av";
import {useState, useEffect, useRef} from "react";

interface NowPlayingBarProps {
  song?: {
    title: string;
    artist: string;
    albumCover?: string;
    audioUrl: string;
  } | null,
  onFavorite?: () => void,
  onPlayPause?: Function,
}

Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  playsInSilentModeIOS: true,
});

export default function NowPlayingBar({song, onFavorite, onPlayPause}: NowPlayingBarProps) {
  const colorScheme = useColorScheme();
  const style = getNowPlayingBarStyle(colorScheme === "dark");

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 1 ? 0 : prev + 0.01));
      }, 10);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);


  useEffect(() => {
    let mounted = true;

    const loadSong = async () => {
      if (!song?.audioUrl) return;

      setIsLoading(true);
      setIsPlaying(false);

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      try {
        const {sound: newSound} = await Audio.Sound.createAsync(
          {uri: song.audioUrl},
          {shouldPlay: true},
          onPlaybackStatusUpdate
        );

        await newSound.setVolumeAsync(1);
        soundRef.current = newSound;

        if (!mounted) {
          await newSound.unloadAsync();
          soundRef.current = null;
        }
      } catch (error) {
        console.log("Error loading audio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSong();

    return () => {
      mounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [song?.audioUrl]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded || !status.durationMillis) return;
    setIsPlaying(status.isPlaying);
    setProgress(status.positionMillis / status.durationMillis);

    if (status.didJustFinish) {
      setProgress(0);
      setIsPlaying(false);
      if (soundRef.current) {
        soundRef.current.setPositionAsync(0);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();

    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  if (!song) return null;

  return (
    <View style={style.container}>
      <View style={style.leftSection}>
        <Image
          source={song.albumCover ? {uri: song.albumCover} : require("@/assets/images/albumBlank.jpg")}
          //@ts-ignore
          style={style.albumCover}
        />
        <View style={style.songInfo}>
          <View style={style.titleContainer}>
            <Text style={style.songTitle}>{song.title}</Text>
            <Image
              source={require("@/assets/images/spotifyLogo.png")}
              //@ts-ignore
              style={style.sourceLogo}
            />
          </View>
          <Text style={style.artistName}>{song.artist}</Text>
        </View>
      </View>

      <View style={style.rightSection}>
        <TouchableOpacity onPress={onFavorite} style={style.actionButton}>
          <Ionicons name="star" size={18} color="#ffd700"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={style.actionButton}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={18}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <View style={{position: "absolute", bottom: 0, left: 13, height: 2, width: "100%", backgroundColor: "#444"}}>
        <View style={{height: 2, backgroundColor: isLoading ? "gray" : "#1DB954", width: `${progress * 100}%`}}/>
      </View>
    </View>
  );
}