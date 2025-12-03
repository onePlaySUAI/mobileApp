import {View, TextInput, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import { getHeaderStyle } from "@/assets/styles/header";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";
import SearchIcon from "../icons/SearchIcon";
import { router } from "expo-router";
import {useState} from "react";
import {getListOfSongsByQuery, ytGetSongByQuery} from "@/assets/serverCalls/youtube";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {addSong} from "@/store/songsSlice";

interface headerParams {
  page: 'Home' | 'Library';
  isDarkmode: boolean;
}

export default function CustomHeader ({ isDarkmode, page }: headerParams) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const style = getHeaderStyle(isDarkmode, insets.top);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const searchByQuery = async () => {
    if (isLoading || !query) return;

    setIsLoading(true);
    try {
      const [ytSong, listOfYtSongs] = await Promise.all([
        ytGetSongByQuery(query),
        getListOfSongsByQuery(query, 11)
        // Spotify...
      ])
      const songs = [ytSong, ...listOfYtSongs];
      for (let song of songs) {
        if (song) {
          dispatch(addSong({
            id: song.youTubeId,
            title: song.name,
            artist: song.authorName,
            albumCover: song.imageSet,
            youTubeId: song.youTubeId,
            lastFMMbId: song.lastFMMbId,
            audioUrl: song.stream,
            source: 'Youtube',
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