import { View, Text, TouchableOpacity, Image } from "react-native";
import { getFullScreenStyle, getNowPlayingBarStyle } from "@/assets/styles/nowPlayingBar";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SongType } from "@/store/songsSlice";
import { getSteamByYItId } from "@/assets/serverCalls/youtube";
import { useAudioControls } from "@/assets/hooks/audioControls";
import * as Haptics from 'expo-haptics';

interface NowPlayingBarProps {
  song?: SongType;
  isDarkmode: boolean;
  onFavorite?: () => void;
  onPlayPause?: () => void;
}

interface CompactViewProps {
  song: SongType;
  isDarkmode: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  isError: boolean;
  progress: number;
  togglePlayPause: () => void;
  onFavorite?: () => void;
}

interface FullScreenProps extends CompactViewProps {
  handleNextSong: () => void,
  handlePrevSong: () => void,
}

export default function NowPlayingBar({
                                        song,
                                        isDarkmode,
                                        onFavorite,
                                        onPlayPause,
                                      }: NowPlayingBarProps) {
  const {
    isPlaying,
    isLoading,
    isError,
    progress,
    loadSound,
    togglePlayPause,
    setAudioMode,
    unloadSound,
  } = useAudioControls();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const style = isFullScreen
    ? getFullScreenStyle(isDarkmode)
    : getNowPlayingBarStyle(isDarkmode);

  useEffect(() => {
    let mounted = true;

    (async () => {
      await setAudioMode();
      if (!mounted) return;

      if (song) {
        if (song.audioUrl === "." && song.youTubeId) {
          const stream = await getSteamByYItId(song.youTubeId);
          await loadSound(stream);
        } else {
          await loadSound(song.audioUrl);
        }
      }
    })();

    return () => {
      mounted = false;
      unloadSound();
    };
  }, [song?.audioUrl, song?.youTubeId]);

  const handlePress = (e: any) => {
    e.stopPropagation();
    setIsFullScreen((p) => !p);
  };

  // Mock functions for next/prev
  const handleNextSong = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  const handlePrevSong = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  const TGP = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    togglePlayPause();
  }

  if (!song) return null;

  return (
    <TouchableOpacity onPress={handlePress} style={style.container}>
      {isFullScreen ? (
        <FullScreen
          song={song}
          isDarkmode={isDarkmode}
          isPlaying={isPlaying}
          isLoading={isLoading}
          isError={isError}
          progress={progress}
          togglePlayPause={TGP}
          onFavorite={onFavorite}
          handleNextSong={handleNextSong}
          handlePrevSong={handlePrevSong}
        />
      ) : (
        <CompactView
          song={song}
          isDarkmode={isDarkmode}
          isPlaying={isPlaying}
          isLoading={isLoading}
          isError={isError}
          progress={progress}
          togglePlayPause={TGP}
          onFavorite={onFavorite}
        />
      )}
    </TouchableOpacity>
  );
}

function FullScreen({
                      song,
                      isDarkmode,
                      isPlaying,
                      isLoading,
                      isError,
                      progress,
                      togglePlayPause,
                      onFavorite,
                      handleNextSong,
                      handlePrevSong,
                    }: FullScreenProps) {
  const style = getFullScreenStyle(isDarkmode);
  const [progressBarScale, setProgressBarScale] = useState(1);

  const handleProgressBarPress = (e: any) => {
    e.stopPropagation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    setProgressBarScale(1.2);
  }

  return (
    <>
      <Image
        source={
          song.albumCover?.large
            ? { uri: song.albumCover.large }
            : require("@/assets/images/albumBlank.jpg")
        }
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
            style={style.sourceLogo}
          />
        </View>
        <Text style={style.artistName}>{song.artist}</Text>
      </View>

      <View style={style.controls}>
        <TouchableOpacity onPress={handlePrevSong} style={style.controlButton} hitSlop={30}>
          <Ionicons name="play-skip-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={style.controlButton} hitSlop={30}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#ffffff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextSong} style={style.controlButton} hitSlop={30}>
          <Ionicons name="play-skip-forward" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <TouchableOpacity
        style={{
          height: 15,
          width: "80%",
          backgroundColor: "#444",
          marginTop: 16,
          borderRadius: 50,
          overflow: "hidden",
          transform: [{scale: progressBarScale}]
        }}
        onLongPress={handleProgressBarPress}
        onPressOut={() => setProgressBarScale(1)}
        hitSlop={{top: 10, right: 10, left: 10, bottom: 30}}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: isLoading
              ? "gray"
              : isError
                ? "#ff0000"
                : "#1DB954",
            width: `${progress * 100}%`,
          }}
        />
      </TouchableOpacity>
    </>
  );
}

function CompactView({
     song,
     isDarkmode,
     isPlaying,
     isLoading,
     isError,
     progress,
     togglePlayPause,
     onFavorite,
 }: CompactViewProps) {
  const style = getNowPlayingBarStyle(isDarkmode);

  return (
    <>
      <View style={style.leftSection}>
        <Image
          source={
            song.albumCover?.mega
              ? { uri: song.albumCover.mega }
              : require("@/assets/images/albumBlank.jpg")
          }
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
              style={style.sourceLogo}
            />
          </View>
          <Text style={style.artistName}>{song.artist}</Text>
        </View>
      </View>

      <View style={style.rightSection}>
        <TouchableOpacity onPress={onFavorite} style={style.actionButton} >
          <Ionicons name="star" size={18} color="#ffd700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={style.actionButton} hitSlop={10}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={18}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          left: 13,
          height: 2,
          width: "100%",
          backgroundColor: "#444",
        }}
      >
        <View
          style={{
            height: '100%',
            backgroundColor: isLoading
              ? "gray"
              : isError
                ? "#ff0000"
                : "#1DB954",
            width: `${progress * 100}%`,
          }}
        />
      </TouchableOpacity>
    </>
  );
}
