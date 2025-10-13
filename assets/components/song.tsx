import {Image, Pressable, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {getSongStyle} from "@/assets/styles/song";


interface songParams {
  title: string,
  artist: string,
  source: 'Spotify' | 'Youtube' | 'Download';
  albumCover: string,
  active?: boolean,
}
interface songProps {
  params: songParams,
}

export default function Song ({ params }: songProps) {
  const colorScheme = useColorScheme();
  const style = getSongStyle(colorScheme === 'dark');

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
          <Text style={style.title}>{params.title.length > 15 ? params.title.slice(0, 15) + '...' : params.title}</Text>
          <Text style={style.artist}>{params.artist.length > 15 ? params.artist.slice(0, 15) + '...' : params.artist}</Text>
        </View>
      </View>
      <View>
        {/* Source logos */}
        <View style={style.sourceContainer}>
          <Image
            source={require('@/assets/images/spotifyLogo.png')}
            style={{
              ...style.source,
              opacity: (params.source === 'Spotify' ? 1 : 0.5)
            }}
          />
          <Image
            source={require('@/assets/images/ytLogo.png')}
            style={{
              ...style.sourceYT,
              opacity: (params.source === 'Youtube' ? 1 : 0.5)
            }}
          />
          <Image
            source={require('@/assets/images/downloadLogo.png')}
            style={{
              ...style.source,
              opacity: (params.source === 'Download' ? 1 : 0.3)
            }}
          />

        <Pressable
          onPress={() => {}}
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