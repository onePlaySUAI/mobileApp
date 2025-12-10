import { useCallback, useEffect, useRef, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

// playback state type from spotify-web-api-js
type PlaybackState = SpotifyApi.CurrentPlaybackResponse | null;

export function useSpotifyControls(accessToken: string | null) {
  const spotifyRef = useRef<SpotifyWebApi.SpotifyWebApiJs | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);

  // initialize client
  useEffect(() => {
    if (!accessToken) {
      spotifyRef.current = null;
      setIsPlaying(false);
      setProgress(0);
      return;
    }
    const s = new SpotifyWebApi();
    s.setAccessToken(accessToken);
    spotifyRef.current = s;
  }, [accessToken]);

  const setAudioMode = useCallback(async () => {
    // no-op for Spotify, but keep same signature
    return;
  }, []);

  const unloadSound = useCallback(async () => {
    // no-op: Spotify playback is remote
    return;
  }, []);

  const seekToStart = useCallback(async () => {
    if (!spotifyRef.current) return;
    try {
      setIsLoading(true);
      await spotifyRef.current.seek(0);
      setProgress(0);
    } catch (err) {
      console.warn("Spotify seekToStart failed", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const play = useCallback(async () => {
    if (!spotifyRef.current) return;
    try {
      setIsLoading(true);
      await spotifyRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Spotify play failed", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pause = useCallback(async () => {
    if (!spotifyRef.current) return;
    try {
      setIsLoading(true);
      await spotifyRef.current.pause();
      setIsPlaying(false);
    } catch (err) {
      console.warn("Spotify pause failed", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!spotifyRef.current) return;
    try {
      const state = await spotifyRef.current.getMyCurrentPlaybackState();
      if (state?.is_playing) {
        await pause();
      } else {
        await play();
      }
    } catch (err) {
      console.warn("Spotify toggle failed", err);
      setIsError(true);
    }
  }, [pause, play]);

  const loadSound = useCallback(
    async (spotifyUri?: string) => {
      if (!spotifyRef.current || !spotifyUri) return;
      try {
        setIsLoading(true);
        await spotifyRef.current.play({ uris: [spotifyUri] });
        setIsPlaying(true);
        // update progress
        const state = await spotifyRef.current.getMyCurrentPlaybackState();
        if (state?.item?.duration_ms && state?.progress_ms) {
          setProgress(state.progress_ms / state.item.duration_ms);
        } else {
          setProgress(0);
        }
      } catch (err) {
        console.warn("Spotify loadSound failed", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const previousSong = useCallback(async () => {
    if (!spotifyRef.current) return;
    try {
      await spotifyRef.current.skipToPrevious();
    } catch (err) {
      console.warn("Spotify previousSong failed", err);
      setIsError(true);
    }
  }, []);

  const nxtSong = useCallback(async () => {
    if (!spotifyRef.current) return;
    try {
      await spotifyRef.current.skipToNext();
    } catch (err) {
      console.warn("Spotify nxtSong failed", err);
      setIsError(true);
    }
  }, []);

  return {
    isPlaying,
    isLoading,
    isError,
    progress,
    loadSound,
    togglePlayPause,
    setAudioMode,
    unloadSound,
    seekToStart,
    previousSong,
    nxtSong,
  };
}
