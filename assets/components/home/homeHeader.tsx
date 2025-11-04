import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { getHeaderStyle } from "@/assets/styles/header";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchIcon from "../icons/SearchIcon";
import { router } from "expo-router";
import { useSearch } from "@/app/utils/useSearch";

interface HeaderProps {
  page: 'search' | 'library';
}

interface HeaderParams {
  params: HeaderProps;
}

export default function HomeHeader({ params }: HeaderParams) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const style = getHeaderStyle(colorScheme === 'dark', insets.top);
  const { isSearching, searchText, setSearchText, toggleSearch, clearSearch } = useSearch(params.page);

  const displayText = params.page === 'search' ? 'Search' : 'Library';

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <TouchableOpacity onPress={() => router.push('/screens/profile')}>
          <View style={style.circle} />
        </TouchableOpacity>

        {isSearching ? (
          <TextInput
            style={style.searchInput}
            placeholder="Search"
            placeholderTextColor="#ff0000"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            onBlur={clearSearch}
          />
        ) : (
          <Text style={style.libaryInput}>{displayText}</Text>
        )}

        <TouchableOpacity
          style={style.searchButton}
          onPress={toggleSearch}
        >
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
