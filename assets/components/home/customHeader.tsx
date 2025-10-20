import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { getHeaderStyle } from "@/assets/styles/header";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import SearchIcon from "../icons/SearchIcon";
import { router } from "expo-router";


interface headerProps {
  page: 'Home' | 'Library';
}
interface headerParams {
  params: headerProps;
}

export default function CustomHeader ({ params }: headerParams) {
  const colorScheme = useColorScheme();
  const insets: EdgeInsets = useSafeAreaInsets();
  const style = getHeaderStyle(colorScheme === 'dark', insets.top);

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <TouchableOpacity onPress={() => router.push('/(screens)/profile')}>
          <View style={style.circle} />
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