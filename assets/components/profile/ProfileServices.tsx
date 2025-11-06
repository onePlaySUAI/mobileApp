import { View, Text, TouchableOpacity } from 'react-native';
import SpotifyIcon from '../icons/SpotifyIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import { getProfileServicesStyle } from '../../styles/profileServices';

interface ProfileServicesProps {
  isDark: boolean;
}

export default function ProfileServices({ isDark }: ProfileServicesProps) {
  const style = getProfileServicesStyle(isDark);

  return (
    <View style={style.actions}>
      <TouchableOpacity style={[style.serviceBtn, style.spotifyBtn]}>
        <SpotifyIcon width={26} height={26} />
        <Text style={style.spotifyText}>Set your Spotify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[style.serviceBtn, style.youtubeBtn]}>
        <YoutubeIcon width={26} height={26} />
        <Text style={style.youtubeText}>Set your YouTube</Text>
      </TouchableOpacity>
    </View>
  );
}
