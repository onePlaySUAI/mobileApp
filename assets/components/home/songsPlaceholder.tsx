import {setCurrentSong, SongType} from "@/store/songsSlice";
import {ScrollView, Text, View} from "react-native";
import Song from "@/assets/components/song";
import getSongsPlaceholderStyle from "@/assets/styles/songsPlaceholder";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";

interface props {
  isDarkmode: boolean,
  nowPlayingSongId: string,
  openModal: (song: SongType) => void,
  songs: SongType[],
}

export default function SongsPlaceholder({isDarkmode, nowPlayingSongId, openModal, songs}: props) {
  const style = getSongsPlaceholderStyle(isDarkmode);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ScrollView style={style.songsPlaceHolder} contentContainerStyle={style.songsContent}>
    {songs.length === 0 ? (
      <BlankSpaceFiller />
    ) : (
      // Если будет много песен - поменять на flatlist
      songs.map((song, index) => (
        <Song
          key={index}
          params={song}
          onDotsPress={() => openModal(song)}
          onPress={() => dispatch(setCurrentSong(song))}
          active={song.id === nowPlayingSongId}
        />
      ))
    )}
    </ScrollView>
  );
}

function BlankSpaceFiller() {
  return (
    <View style={{flex: 1, alignSelf: 'center'}}>
      <Text style={{color: 'gray'}}>
        Начнем с поиска?
      </Text>
    </View>
  )
}