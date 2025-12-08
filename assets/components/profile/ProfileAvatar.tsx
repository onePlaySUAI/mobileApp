import { View } from 'react-native';
import PlusIcon from '../icons/PlusIcon';
import { getProfileAvatarStyle } from '@/assets/styles_old/profile/profileAvatar';
import { ProfileAvatarProps } from '@/types/components';

export default function ProfileAvatar({ appTheme }: ProfileAvatarProps) {
  const style = getProfileAvatarStyle(appTheme);

  return (
    <View style={style.avatarWrap}>
      <View style={style.avatarCircle}>
        <PlusIcon></PlusIcon>
      </View>
    </View>
  );
}
