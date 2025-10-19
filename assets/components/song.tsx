import {Image, Pressable, Text, useColorScheme, View} from "react-native";
import {getSongStyle} from "@/assets/styles/song";

interface songParams {
  title: string,
  artist: string,
  source: 'Spotify' | 'Youtube' | 'Download';
  albumCover: string,
  active?: boolean,
}
export interface songProps {
  params: songParams,
  onDotsPress?: () => void,
}

export default function Song ({ params, onDotsPress }: songProps) {
  const colorScheme = useColorScheme();
  const style = getSongStyle(colorScheme === 'dark', params.active);
  const STRING_MAX_LENGTH = 22;

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
          <Text style={style.title}>{params.title.length > STRING_MAX_LENGTH ? params.title.slice(0, STRING_MAX_LENGTH) + '...' : params.title}</Text>
          <Text style={style.artist}>{params.artist.length > STRING_MAX_LENGTH ? params.artist.slice(0, STRING_MAX_LENGTH) + '...' : params.artist}</Text>
        </View>
      </View>
      <View>
        {/* Source logos */}
        <View style={style.sourceContainer}>
          <Image
            source={require('@/assets/images/spotifyLogo.png')}
            style={{
              ...(params.source === 'Youtube' ? style.sourceYT : style.source),
              display: (params.source === 'Spotify' ? 'flex' : 'none')
            }}
          />
          <Image
            source={require('@/assets/images/ytLogo.png')}
            style={{
              ...(params.source === 'Youtube' ? style.sourceYT : style.source),
              display: (params.source === 'Youtube' ? 'flex' : 'none')
            }}
          />
          <Image
            source={require('@/assets/images/downloadLogo.png')}
            style={{
              ...(params.source === 'Youtube' ? style.sourceYT : style.source),
              display: (params.source === 'Download' ? 'flex' : 'none')
            }}
          />

        <Pressable
          onPress={onDotsPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={({ pressed }) => [
            style.dotsStyle,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Image
            source={require('@/assets/images/dots.png')}
            style={style.dotsStyle}
          />
        </Pressable>

        </View>
      </View>
    </View>
  )
}