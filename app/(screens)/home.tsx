import {SafeAreaView, useColorScheme} from 'react-native';
import {useState} from 'react';
import { getHomeStyle } from "@/assets/styles/home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "@/assets/components/home/customHeader";
import SongOptionsModal from "@/assets/components/songOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import NowPlayingBar from "@/assets/components/home/nowPlayingBar";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/store/store";
import {selectCurrentSong, SongType} from "@/store/songsSlice";
import SongsPlaceholder from "@/assets/components/home/songsPlaceholder";


export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCurrentSong, setCurrentModalSong] = useState<SongType | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'queue'>('search');

  const songs = useSelector((state: RootState) => state.song.list);
  const nowPlayingSong = useSelector((state: RootState) => selectCurrentSong(state.song));

  const isDarkmode = useColorScheme() === 'dark';

  const openModal = (song: SongType): void => {
    setModalVisible(true);
    setCurrentModalSong(song);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  const style = getHomeStyle(isDarkmode);

  const spotToken = useSelector((state: RootState) => state.spotify.spotifyToken)
  const refreshToken = useSelector((state: RootState) => state.spotify.spotifyRefresh)

  console.log(`h: ${spotToken}, c: ${refreshToken}`)

  return (
    <SafeAreaProvider style={style.safeAreaProvider}>
      <CustomHeader 
        page='Home'
        isDarkmode={isDarkmode}
      />

      <SafeAreaView style={style.container}>
        <SongsPlaceholder
          isDarkmode={isDarkmode}
          nowPlayingSongId={nowPlayingSong?.id ?? ''}
          openModal={openModal}
          songs={songs}
        />
      </SafeAreaView>

      <NowPlayingBar
        song={nowPlayingSong === null ? undefined : nowPlayingSong}
        isDarkmode={isDarkmode}
      />

      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      <SongOptionsModal
        isDarkMode={isDarkmode}
        onClose={closeModal}
        visible={modalVisible && modalCurrentSong !== null}
        song={modalCurrentSong as SongType}
      />

    </SafeAreaProvider>
  );
}
