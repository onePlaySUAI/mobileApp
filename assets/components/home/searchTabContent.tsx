// assets/components/home/searchTabContent.tsx

import { ScrollView } from "react-native";
import Song from "@/assets/components/song";
import { useState } from "react";

export default function SearchTabContent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState({ title: '', artist: '' });

  const openModal = (title: string, artist: string) => {
    setCurrentSong({ title, artist });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80, gap: 12 }}>
      <Song
        params={{
          title: 'quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf',
          artist: 'THE John',
          albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
          source: 'Spotify',
        }}
        onDotsPress={() => openModal('quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf', 'THE John')}
      />
      <Song
        params={{
          title: 'I hate you',
          artist: 'Nikita',
          albumCover: 'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
          source: 'Youtube',
          active: true,
        }}
        onDotsPress={() => openModal('I hate you', 'Nikita')}
      />
    </ScrollView>
  );
}
