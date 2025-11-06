import { View } from 'react-native';
import PlusIcon from '../icons/PlusIcon';
import { getProfileAvatarStyle } from '../../styles/profileAvatar';

interface ProfileAvatarProps {
  isDark: boolean;
}

export default function ProfileAvatar({ isDark }: ProfileAvatarProps) {
  const style = getProfileAvatarStyle(isDark);

  return (
    <View style={style.avatarWrap}>
      <View style={style.avatarCircle}>
        <PlusIcon></PlusIcon>
      </View>
    </View>
  );
}
