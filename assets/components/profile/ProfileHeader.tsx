import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { getProfileHeaderStyle } from "@/assets/styles/profileHeader";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";
import SearchIcon from "../icons/SearchIcon";
import { router } from "expo-router";

interface ProfileAvatarProps {
  isDark: boolean;
}

export default function ProfileHeader ({ isDark }: ProfileAvatarProps) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const style = getProfileHeaderStyle(isDark, insets.top);

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <TouchableOpacity onPress={() => router.back()} style={style.backBtn}>
          <Text style={style.backIcon}>←</Text>
        </TouchableOpacity>
        <TextInput
          style={style.searchInput}
          placeholder="Search"
          placeholderTextColor="#ff0000"
        />
        <TouchableOpacity style={style.searchButton}>
          <SearchIcon></SearchIcon>
        </TouchableOpacity>
      </View>
    </View>
  )
}