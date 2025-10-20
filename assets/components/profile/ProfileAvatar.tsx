import { View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import PlusIcon from "../icons/PlusIcon";

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

function getProfileAvatarStyle(isDark: boolean) {
  const COLORS = {
    card: isDark ? '#2a2a2a' : '#e6e6e6',
  };

  return StyleSheet.create({
    avatarWrap: {
      alignItems: 'center',
      paddingTop: 24,
    },
    avatarCircle: {
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: COLORS.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    plusWrap: {
      width: 140,
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    plus: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 12,
      transform: [{ rotate: '0deg' }],
    },
  });
}
