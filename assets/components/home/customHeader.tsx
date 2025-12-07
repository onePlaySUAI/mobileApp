import {View, TextInput, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import { getHeaderStyle } from "@/assets/styles/header";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";
import SearchIcon from "../icons/SearchIcon";
import { router } from "expo-router";
import {useState} from "react";
import {getListOfSongsByQuery, SongResponse, ytGetSongByQuery} from "@/assets/serverCalls/youtube";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {addSong} from "@/store/songsSlice";
import {getSongsSpotify} from "@/assets/serverCalls/spotifySDK";

interface headerParams {
  page: 'Home' | 'Library';
  isDarkmode: boolean;
}

export default function CustomHeader ({ isDarkmode, page }: headerParams) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const style = getHeaderStyle(isDarkmode, insets.top);

  const spotifyAccess = useSelector((state: RootState) => state.spotify.spotifyToken);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const searchByQuery = async () => {
    if (isLoading || !query) return;

    setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        ytGetSongByQuery(query),
        getListOfSongsByQuery(query, 11),
        getSongsSpotify(query, spotifyAccess, 11),
      ])
      const [ytSearchQuery, songsList, spotSongs] = results.map(r =>
        r.status === "fulfilled" ? r.value : []
      );
      const songs = [
        ...(Array.isArray(ytSearchQuery) ? ytSearchQuery : [ytSearchQuery]),
        ...songsList as SongResponse[],
        ...spotSongs as SongResponse[],
      ];

      for (let song of songs) {
        if (song) {
          dispatch(addSong({
            id: song.youTubeId ?? song.spotifyId ?? String(Symbol(song.name)),
            title: song.name,
            artist: song.authorName,
            albumCover: song.imageSet,
            youTubeId: song.youTubeId,
            lastFMMbId: song.lastFMMbId,
            audioUrl: song.stream,
            source: song.type === 0 ? 'Youtube' : 'Spotify',
          }));
        }
      }
    } catch (e) {
      console.error(e);
      if (e === '500') alert('Ошибка сервера, повторите попытку позже');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <TouchableOpacity onPress={() => router.push('/(screens)/profile')}>
          <Image
            style={style.circle}
            source={require('@/assets/images/mockPfp.jpg')}
          />
        </TouchableOpacity>
        <TextInput
          style={style.searchInput}
          placeholder="Search"
          placeholderTextColor="#ff0000"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          style={style.searchButton}
          onPress={searchByQuery}
        >
          { isLoading ? <ActivityIndicator /> : <SearchIcon/>}
        </TouchableOpacity>
      </View>
    </View>
  )
}