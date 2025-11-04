import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SpotifyIcon from "../icons/SpotifyIcon";
import YoutubeIcon from "../icons/YoutubeIcon";

interface ProfileServicesProps {
  isDark: boolean;
}

export default function ProfileServices({ isDark }: ProfileServicesProps) {
  const style = getProfileServicesStyle(isDark);

  return (
    <View style={style.actions}>
      <TouchableOpacity style={[style.serviceBtn, style.spotifyBtn]}>
        <SpotifyIcon width={26} height={26} />
        <Text style={style.serviceText}>Set your Spotify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[style.serviceBtn, style.youtubeBtn]}>
        <YoutubeIcon width={26} height={26} />
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
