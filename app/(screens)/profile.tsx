import { View, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import ProfileHeader from "@/assets/components/profile/ProfileHeader";
import ProfileAvatar from "@/assets/components/profile/ProfileAvatar";
import ProfileInfo from "@/assets/components/profile/ProfileInfo";
import ProfileServices from "@/assets/components/profile/ProfileServices";

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const style = getProfileStyle(isDark);

  return (
    <View style={style.container}>
      <ProfileHeader isDark={isDark} />
      <ProfileAvatar isDark={isDark} />
      <ProfileInfo isDark={isDark} />
      <ProfileServices isDark={isDark} />
    </View>
  );
}

function getProfileStyle(isDark: boolean) {
  const COLORS = {
    bg: isDark ? '#111' : '#f2f2f7',
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
    },
  });
}


