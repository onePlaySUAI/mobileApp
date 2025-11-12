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
    const fetchSongs = async () => {
      await new Promise(res => setTimeout(res, 1000));

      const fakeSongs: SongItem[] = [
        {
          id: '1',
          title: 'I hate you',
          artist: 'Nikita',
          albumCover: 'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
          audioUrl: 'https://rr3---sn-ixh7yn7d.googlevideo.com/videoplayback?expire=1762999882&ei=6ukUaYC6D-OWv_IP57vZ8Q4&ip=104.164.62.106&id=o-ACl5l8WK_77X3b00x8l55O31TKqOZeSjKbxdKcn0Mc3F&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=90&met=1762978282%2C&mh=Wi&mm=31%2C26&mn=sn-ixh7yn7d%2Csn-5goeenez&ms=au%2Conr&mv=m&mvi=3&pl=24&rms=au%2Cau&gcr=us&initcwndbps=1068750&bui=AdEuB5Re2nO7aQWMhe7C9MFCzYx8Hjboba7od5PA1RNFqSlIuxOatTMlsveQnS2MviZASKwI4PFhmgdL&spc=6b0G_OLVXRXS&vprv=1&svpuc=1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=4209356&dur=258.421&lmt=1750382614299179&mt=1762977804&fvip=3&keepalive=yes&fexp=51552689%2C51565115%2C51565682%2C51580968&c=ANDROID&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhALzo6YDqRlICSj57HBJGEwutZuFfnYKBbf6sJ1JOz7UIAiBRGBK6Ltj8TeE_wNlKKHe2UT1OnIG6fMmsSL-MtcEaFA%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgMn9wT2z31Y05gEAMaUf5YSrSK86YPVgTXjZpyyiUGKkCIHuqXWSJR45SOO9r6HBxYgeVtYla6sMkmFhv7euxm_y7',
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
    };

    fetchSongs();
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
