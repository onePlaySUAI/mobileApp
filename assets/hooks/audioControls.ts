import { Audio } from "expo-av";
import { useCallback, useRef, useState } from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {nextSong, prevSong} from "@/store/songsSlice";

export function useAudioControls(onPlaybackStatusUpdate?: (s: any) => void) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

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

  const seekToStart = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.setPositionAsync(0);
    } catch (err) {
      console.warn("Failed to seek", err);
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
    } catch (err) {
      console.warn("Toggle failed", err);
      setIsError(true);
    }
  }, [pause, play]);

  const loadSound = useCallback(
    async (audioUrl?: string) => {
      if (!audioUrl) return;
      setIsLoading(true);
      setIsPlaying(false);

      if (soundRef.current) await unloadSound();

      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true },
          (status) => {
            if (!status || !status.isLoaded || !status.durationMillis) return;

            setIsPlaying(Boolean(status.isPlaying));
            setProgress(status.positionMillis / status.durationMillis);

            if (status.didJustFinish) {
              setProgress(0);
              setIsPlaying(false);
              seekToStart();
            }

            onPlaybackStatusUpdate?.(status);
          }
        );

        await sound.setVolumeAsync(1);
        soundRef.current = sound;
      } catch (err) {
        console.warn("Load failed", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [unloadSound, seekToStart, onPlaybackStatusUpdate]
  );

  const previousSong = useCallback(() => {
    dispatch(prevSong());
  }, [dispatch]);

  const nxtSong = useCallback(() => {
    dispatch(nextSong());
  }, [dispatch])

  return {
    isPlaying,
    isLoading,
    isError,
    progress,
    soundRef,
    setProgress,
    loadSound,
    play,
    pause,
    togglePlayPause,
    unloadSound,
    setAudioMode,
    seekToStart,
    previousSong,
    nxtSong,
  };
}
