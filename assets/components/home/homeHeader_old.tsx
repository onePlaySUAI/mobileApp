import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchIcon from '../icons/SearchIcon';
import { router } from 'expo-router';
import { useSearch } from '@/utils/useSearch';
import { Colors } from '@/assets/constants/colors';
import { getHeaderStyle } from '@/assets/styles_old/home/header';
import { HeaderParams } from '@/types/components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getListOfSongsByQuery, ytGetSongByQuery } from '@/assets/serverCalls/youtube';
import { addSong } from '@/store/songsSlice';

export default function HomeHeader({ params }: HeaderParams) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const style = getHeaderStyle(colorScheme === 'dark', insets.top);
  const { isSearching, searchText, setSearchText, toggleSearch, clearSearch } = useSearch(params.page);
  const displayText = params.page === 'search' ? 'Search' : 'Library';
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const searchByQuery = async () => {
    if (isLoading || !searchText) return;

    setIsLoading(true);
    try {
      const [ytSong, listOfYtSongs] = await Promise.all([
        ytGetSongByQuery(searchText),
        getListOfSongsByQuery(searchText, 11)
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
          <View style={style.circle} />
        </TouchableOpacity>

        {isSearching ? (
          <TextInput
            style={style.searchInput}
            placeholder="Search"
            placeholderTextColor={Colors.accent}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            onBlur={clearSearch}
          />
        ) : (
          <TouchableOpacity onPress={toggleSearch}>
            <Text style={style.libaryInput}>{displayText}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={style.searchButton} onPress={searchByQuery}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}