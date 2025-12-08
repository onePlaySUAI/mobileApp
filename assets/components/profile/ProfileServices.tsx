import { View, Text, TouchableOpacity } from 'react-native';
import YoutubeIcon from '../icons/YoutubeIcon';
import { getProfileServicesStyle } from '@/assets/styles_old/profile/profileServices';
import { ProfileServicesProps } from '@/types/components';
import SpotifyIcon from '@/assets/icons/SpotifyIcon';


export default function ProfileServices({ appTheme }: ProfileServicesProps) {
  const style = getProfileServicesStyle(appTheme);

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