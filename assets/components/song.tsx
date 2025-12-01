import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { getSongStyle } from '@/assets/styles/song';
import { truncateText } from '@/utils/textHelpers';
import SpotifyIcon from './icons/SpotifyIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import DownloadIcon from './icons/DownloadIcon';
import ThreeDotsIcon from './icons/ThreeDotsIcon';
import { Colors } from '../constants/colors';
import { SongProps } from '@/types/components';


const STRING_MAX_LENGTH = 22;

export default function Song({ params, onDotsPress }: SongProps) {
  const colorScheme = useColorScheme();
  const style = getSongStyle(colorScheme === 'dark', params.active ?? false);
  const dotsColor = colorScheme === 'dark' ? Colors.dark.Item.optionIcon : Colors.light.Item.optionIcon;
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
        <Image source={{ uri: params.albumCover }} style={style.albumCover} />
        {/* Title and Author box */}
        <View>
          <Text style={style.title}>
            {truncateText(params.title, STRING_MAX_LENGTH)}
          </Text>
          <Text style={style.artist}>
            {truncateText(params.artist, STRING_MAX_LENGTH)}
          </Text>
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
            <ThreeDotsIcon width={16} height={16} color={dotsColor}/>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
