// assets/components/home/searchTabContent.tsx

import { ScrollView } from 'react-native';
import Song from '@/assets/components/song';
import { mockSearchSongs } from '@/utils/sampleData';
import { SongParams } from '@/types/components';

interface SearchTabContentProps {
  openModal: (song: SongParams) => void;
  closeModal: () => void;
}

export default function SearchTabContent({
  openModal,
}: SearchTabContentProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 80,
        gap: 12,
        paddingHorizontal: 16,
      }}
    >
      {mockSearchSongs.map((song, index) => (
        <Song
          key={index}
          params={song}
          onDotsPress={() => openModal(song)}
        />
      ))}
    </ScrollView>
  );
}
