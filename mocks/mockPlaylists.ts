import { Playlist } from "@/types/store";
import { mockSongs } from "./mockSongs";

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "My Favorites",
    songs: [mockSongs[0], mockSongs[1], mockSongs[2], mockSongs[3], mockSongs[4]],
  },
  {
    id: "2",
    name: "Chill Vibes",
    songs: [mockSongs[1], mockSongs[3], mockSongs[4], mockSongs[5], mockSongs[6]],
  },
  {
    id: "3",
    name: "Workout Mix",
    songs: [mockSongs[0], mockSongs[2], mockSongs[4], mockSongs[7], mockSongs[8]],
  },
  {
    id: "4",
    name: "Study Session",
    songs: [mockSongs[1], mockSongs[2], mockSongs[3], mockSongs[5], mockSongs[9]],
  },
  {
    id: "5",
    name: "Road Trip",
    songs: [mockSongs[0], mockSongs[3], mockSongs[4], mockSongs[6], mockSongs[7], mockSongs[8]],
  },
  {
    id: "6",
    name: "Empty Playlist",
    songs: [],
  },
];