import { View, Text, TouchableOpacity, Image } from "react-native";
import { getNowPlayingBarStyle } from "@/assets/styles/nowPlayingBar";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useState, useEffect, useRef, useCallback } from "react";
import { SongType } from "@/store/songsSlice";

interface NowPlayingBarProps {
  song?: SongType;
  isDarkmode: boolean;
  onFavorite?: () => void;
  onPlayPause?: Function;
}

export default function NowPlayingBar({
                                        song,
                                        onFavorite,
                                        onPlayPause,
                                        isDarkmode,
                                      }: NowPlayingBarProps) {
  const style = getNowPlayingBarStyle(isDarkmode);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const setAudioMode = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });
    } catch (err) {
      console.warn("Failed to set audio mode", err);
    }
  }, []);


  const onPlaybackStatusUpdate = useCallback((status: any) => {
    if (!status || !status.isLoaded || !status.durationMillis) return;

    setIsPlaying(Boolean(status.isPlaying));
    setProgress(status.positionMillis / status.durationMillis);

    if (status.didJustFinish) {
      setProgress(0);
      setIsPlaying(false);
      seekToStart().then();
    }
  }, []);


  const seekToStart = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.setPositionAsync(0);
    } catch (err) {
      console.warn("Failed to seek to start", err);
    }
  }, []);


  const play = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Play failed", err);
      setIsError(true);
    }
  }, []);

  const pause = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } catch (err) {
      console.warn("Pause failed", err);
      setIsError(true);
    }
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      const status = await soundRef.current.getStatusAsync();
      if (!status.isLoaded) return;

      if (status.isPlaying) {
        await pause();
      } else {
        await play();
      }

      if (onPlayPause) {
        try {
          onPlayPause();
        } catch {
          // ignore callback errors
        }
      }
    } catch (err) {
      console.warn("Toggle play/pause failed", err);
      setIsError(true);
    }
  }, [pause, play, onPlayPause]);


  const unloadSound = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.unloadAsync();
    } catch (err) {
      console.warn("Unload failed", err);
    } finally {
      soundRef.current = null;
    }
  }, []);


  const loadSound = useCallback(
    async (audioUrl?: string) => {
      if (!audioUrl) return;
      setIsLoading(true);
      setIsPlaying(false);

      // выгрузить предыдущий звук
      if (soundRef.current) {
        await unloadSound();
      }

      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );

        await newSound.setVolumeAsync(1);
        soundRef.current = newSound;
      } catch (error) {
        console.log("Error loading audio:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [onPlaybackStatusUpdate, unloadSound]
  );

  /**
   * Progress animation while loading
   */
  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (isLoading) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 1 ? 0 : prev + 0.01));
      }, 10);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isLoading]);

  useEffect(() => {
    setProgress(1);
  }, [isError]);

  /**
   * Load song when audioUrl changes
   */
  useEffect(() => {
    let mounted = true;

    (async () => {
      await setAudioMode();
      if (!mounted) return;
      await loadSound(song?.audioUrl);
    })();

    return () => {
      mounted = false;
      unloadSound();
    };
  }, [song?.audioUrl, loadSound, unloadSound, setAudioMode]);

  const handlePress = (e: any) => {
    e.stopPropagation();
  };

  if (!song) return null;

  return (
    <TouchableOpacity onPress={handlePress} style={style.container}>
      <View style={style.leftSection}>
        <Image
          source={
            song.albumCover ? { uri: song.albumCover } : require("@/assets/images/albumBlank.jpg")
          }
          //@ts-ignore
          style={style.albumCover}
        />
        <View style={style.songInfo}>
          <View style={style.titleContainer}>
            <Text style={style.songTitle}>{song.title}</Text>
            <Image
              source={
                song.source === "Spotify"
                  ? require("@/assets/images/spotifyLogo.png")
                  : require("@/assets/images/ytLogo.png")
              }
              //@ts-ignore
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

        <TouchableOpacity onPress={togglePlayPause} style={style.actionButton}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", bottom: 0, left: 13, height: 2, width: "100%", backgroundColor: "#444" }}>
        <View style={{
          height: 2,
          backgroundColor: isLoading
            ? "gray"
            : isError
              ? "#ff0000"
              : "#1DB954",
          width: `${progress * 100}%`
        }} />
      </View>
    </TouchableOpacity>
  );
}
