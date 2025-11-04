// assets/components/home/searchTabContent.tsx

import { ScrollView } from "react-native";
import Song from "@/assets/components/song";
import { mockSearchSongs } from "@/app/utils/sampleData";

interface SearchTabContentProps {
  openModal: (title: string, artist: string) => void;
  closeModal: () => void;
}

export default function SearchTabContent({openModal, closeModal} : SearchTabContentProps) {

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80, gap: 12, paddingHorizontal: 16 }}>
      {mockSearchSongs.map((song, index) => (
        <Song
          key={index}
          params={song}
          onDotsPress={() => openModal(song.title, song.artist)}
        />
      ))}
    </ScrollView>
  );
}
