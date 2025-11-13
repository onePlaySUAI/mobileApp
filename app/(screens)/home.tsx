import {SafeAreaView, ScrollView, useColorScheme, View, Text} from 'react-native';
import { Redirect } from 'expo-router';
import {useEffect, useState} from 'react';
import { getHomeStyle } from "@/assets/styles/home";
import Song from "@/assets/components/song";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "@/assets/components/home/customHeader";
import SongOptionsModal from "@/assets/components/songOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import NowPlayingBar from "@/assets/components/nowPlayingBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import type {AppDispatch} from "@/store/store";
import {setCurrentSong, setSongList, SongItem} from "@/store/songsSlice";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCurrentSong, setCurrentModalSong] = useState<{title: string, artist: string}>({title: 'null', artist: 'null'});
  const [activeTab, setActiveTab] = useState<'search' | 'queue'>('search');

  const songs = useSelector((state: RootState) => state.song.list);
  const nowPlayingSong = useSelector((state: RootState) => state.song.current);
  const dispatch = useDispatch<AppDispatch>();

  const colorScheme = useColorScheme();

  const openModal = (title: string, artist: string): void => {
    setModalVisible(true);
    setCurrentModalSong({ title, artist });
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  const style = getHomeStyle(colorScheme === 'dark');

  useEffect(() => {
      const fakeSongs: SongItem[] = [
        {
          id: '1',
          title: 'I hate you',
          artist: 'Nikita',
          albumCover: 'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
          audioUrl: 'https://rr3---sn-ixh7yn7e.googlevideo.com/videoplayback?expire=1763071925&ei=VAMWabL3O86d-NgP_ImRiAs&ip=104.164.62.106&id=o-AHRYkG8cEPDYz5dz3Ln8_buf8DKZAQrHMT-YLWf4GMVR&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1763050324%2C&mh=41&mm=31%2C26&mn=sn-ixh7yn7e%2Csn-5goeenes&ms=au%2Conr&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1105000&bui=AdEuB5SJIZrj6g1iTt_ufbL8PiCeET-Llvd1Qi4qyY96uPBoyOZKC9huJ2D83WWquaabWdSgSmeVx0Hj&spc=6b0G_DSKlXr3&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=2237378&dur=138.205&lmt=1707175847821981&mt=1763049867&fvip=1&keepalive=yes&fexp=51552689%2C51565116%2C51565682%2C51580968&c=ANDROID&txp=4532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgFXpP2L-kAuU5bhWnp2HMFU9AgmcIbK4-Tjk_NCx526ACIQDb9m_GjH-q7Dwmh2e-3QY2KVvvN3SHADnehIEqwm31CQ%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRgIhAI6bTVo06L17pnNtPnZn_u7PyomZ6lESdTsxQETnTNs3AiEA-bvo9NRrqSF3fc6U3JlQNUaSkW3lkQo41Ei46sI3Qb4%3D',
          source: 'Youtube',
        },
        {
          id: '2',
          title: 'Song 2',
          artist: 'Blur',
          albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
          audioUrl: 'https://www.myinstants.com/media/sounds/liutyi-ponos.mp3',
          source: 'Spotify',
        },
      ];

      dispatch(setSongList(fakeSongs));
  }, [dispatch]);


  return (
    <SafeAreaProvider style={style.safeAreaProvider}>
      {/* Header */}
      <CustomHeader params={{ page: 'Home' }} />

      {/* Songs */}
      <SafeAreaView style={style.container}>
        <ScrollView style={style.songsPlaceHolder} contentContainerStyle={style.songsContent}>
          {songs.length === 0 ? (
            <View style={{flex: 1, alignSelf: 'center'}}>
              <Text style={{color: 'gray'}}>
                Loading songs...
              </Text>
            </View>
          ) : (
            songs.map((songItem, index) => (
              <Song
                key={index}
                params={songItem}
                onDotsPress={() => openModal(songItem.title, songItem.artist)}
                onPlay={() => dispatch(setCurrentSong(songItem))}
                active={nowPlayingSong?.id === songItem.id}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Audio Player */}
      <NowPlayingBar song={nowPlayingSong} />

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      {/* Modal */}
      <SongOptionsModal
        isDarkMode={colorScheme === 'dark'}
        onClose={closeModal}
        visible={modalVisible}
        song={{ title: modalCurrentSong.title, artist: modalCurrentSong.artist }}
      />
    </SafeAreaProvider>
  );
}
