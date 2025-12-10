import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from "react-native";
import {spotifyAuthUrl} from "@/assets/serverCalls/spotify";
import {useDispatch} from "react-redux";
import {setSessionId} from "@/store/spotifySlice";


interface ProfileServicesProps {
  isDark: boolean;
}

export default function ProfileServices({ isDark }: ProfileServicesProps) {
  const dispatch = useDispatch();
  const style = getProfileServicesStyle(isDark);

  const handleSpotifyRegister = async () => {
    const redirectParams = await spotifyAuthUrl();
    dispatch(setSessionId(redirectParams.sessionId));
    await Linking.openURL(`${redirectParams.url}/${redirectParams.sessionId}`)
  }

  return (
    <View style={style.actions}>
      <TouchableOpacity
        style={[style.serviceBtn, style.spotifyBtn]}
        onPress={handleSpotifyRegister}
      >
        <Image source={require('@/assets/images/spotifyLogo.png')} style={style.serviceIcon} />
        <Text style={style.serviceText}>Set your Spotify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[style.serviceBtn, style.youtubeBtn]}>
        <Image source={require('@/assets/images/ytLogo.png')} style={style.serviceIcon} />
        <Text style={[style.serviceText, style.youtubeText]}>Set your YouTube</Text>
      </TouchableOpacity>
    </View>
  );
}

function getProfileServicesStyle(isDark: boolean) {
  const COLORS = {
    text: '#ffffff',
  };

  return StyleSheet.create({
    actions: {
      paddingTop: 18,
      alignItems: 'center',
      gap: 10,
    },
    serviceBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 8,
    },
    spotifyBtn: {
      backgroundColor: 'rgba(0,0,0,0.25)',
    },
    youtubeBtn: {
      backgroundColor: 'rgba(0,0,0,0.25)',
    },
    serviceIcon: {
      width: 26,
      height: 26,
      resizeMode: 'contain',
    },
    serviceText: {
      color: COLORS.text,
      fontSize: 14,
    },
    youtubeText: {
      color: '#ff2d55',
    },
  });
}
