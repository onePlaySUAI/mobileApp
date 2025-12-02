import {SongType} from "@/store/songsSlice";
import {ScrollView, Text, View} from "react-native";
import Song from "@/assets/components/song";
import getSongsPlaceholderStyle from "@/assets/styles/songsPlaceholder";

interface props {
  isDarkmode: boolean,
  nowPlayingSongId: string,
  openModal: (song: SongType) => void,
  setCurrentSong: (song: SongType) => void,
  songs: SongType[],
}

export default function SongsPlaceholder({isDarkmode, nowPlayingSongId, openModal, setCurrentSong, songs}: props) {
  const style = getSongsPlaceholderStyle(isDarkmode);

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
          onPress={() => setCurrentSong(song)}
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