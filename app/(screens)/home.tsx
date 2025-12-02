import {SafeAreaView, ScrollView, useColorScheme, View, Text} from 'react-native';
import {useEffect, useState} from 'react';
import { getHomeStyle } from "@/assets/styles/home";
import Song from "@/assets/components/song";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "@/assets/components/home/customHeader";
import SongOptionsModal from "@/assets/components/songOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import NowPlayingBar from "@/assets/components/home/nowPlayingBar";
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
          title: 'Metal Pipe',
          artist: 'Nikita',
          albumCover: 'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
          audioUrl: 'https://rr1---sn-f5f7kn7z.googlevideo.com/videoplayback?expire=1764550162&ei=spEsad7yL4rM6dsP6vyu0A4&ip=147.45.217.189&id=o-AKQt2aqIB5f3qng_yne_M_U04bHukKj0CLc6EF8j9k7n&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=369&met=1764528562%2C&mh=UF&mm=31%2C29&mn=sn-f5f7kn7z%2Csn-f5f7lnl6&ms=au%2Crdu&mv=m&mvi=1&pl=25&rms=au%2Cau&gcr=ru&initcwndbps=977500&bui=AdEuB5S3Tz6D2Fyzr53JUcO7O_3sngJWPBfqE9MiWjzzONfudux7MN-C5yUKDg7ehqYrjjeTAS82-s3A&spc=6b0G_GuuUko8&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=4133757&dur=255.373&lmt=1715013731495534&mt=1764528073&fvip=4&keepalive=yes&fexp=51552689%2C51565116%2C51565682%2C51580968&c=ANDROID&txp=4532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAL4FPdGRQ70WxBD_0cjzjXmHKqfNFJuU4sOKAWC1ul4pAiEAuSqR-pj9gLMpSLm_i9gOMDAzQLjDGS--75lK5TWn1lY%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgCHrjpdLhBLDWzWgZy9UjTbOGC3biaB7S2x_SDqQv1xICIHl1avJeTGLkORrBaceSYGV18-qbOG97QHLLm1YzkVyD',
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
