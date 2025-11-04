import {Image, Pressable, Text, useColorScheme, View} from "react-native";
import {getSongStyle} from "@/assets/styles/song";
import { truncateText } from "@/app/utils/textHelpers";
import SpotifyIcon from "./icons/SpotifyIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import DownloadIcon from "./icons/DownloadIcon";
import ThreeDotsIcon from "./icons/dotsIcon";

export interface SongParams {
  title: string;
  artist: string;
  source: 'Spotify' | 'Youtube' | 'Download';
  albumCover: string;
  active?: boolean;
}

export interface SongProps {
  params: SongParams;
  onDotsPress?: () => void;
}

const STRING_MAX_LENGTH = 22;

export default function Song ({ params, onDotsPress }: SongProps) {
  const colorScheme = useColorScheme();
  const style = getSongStyle(colorScheme === 'dark', params.active ?? false);

  const getSourceIcon = (source: string) => {
    const iconProps = { width: 20, height: 20 };

    switch (source) {
      case 'Spotify':
        return <SpotifyIcon {...iconProps} />;
      case 'Youtube':
        return <YoutubeIcon {...iconProps} />;
      case 'Download':
        return <DownloadIcon {...iconProps} />;
      default:
        return <SpotifyIcon {...iconProps} />;
    }
  };

  return (
    <View style={style.songContainer}>
      <View style={style.albumTitleContainer}>
        {/* Album cover */}
        <Image
          source={{uri: params.albumCover}}
          style={style.albumCover}
        />
        {/* Title and Author box */}
        <View>
          <Text style={style.title}>{truncateText(params.title, STRING_MAX_LENGTH)}</Text>
          <Text style={style.artist}>{truncateText(params.artist, STRING_MAX_LENGTH)}</Text>
        </View>
      </View>
      <View>
        {/* Source logos */}
        <View style={style.sourceContainer}>
          {getSourceIcon(params.source)}

          <Pressable
            onPress={onDotsPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={({ pressed }) => [
              style.dotsStyle,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <ThreeDotsIcon width={16} height={16} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}