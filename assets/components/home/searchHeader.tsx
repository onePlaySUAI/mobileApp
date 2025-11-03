import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { getHeaderStyle } from "@/assets/styles/header";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchIcon from "../icons/SearchIcon";
import { router } from "expo-router";
import { useState, useEffect } from "react";

interface HeaderProps {
  page: 'search' | 'library';
}

interface HeaderParams {
  params: HeaderProps;
}

export default function SearchHeader({ params }: HeaderParams) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const style = getHeaderStyle(colorScheme === 'dark', insets.top);

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Сброс при смене экрана
  useEffect(() => {
    setIsSearching(false);
    setSearchText('');
  }, [params.page]);

  const displayText = params.page === 'search' ? 'Search' : 'Library';

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <TouchableOpacity onPress={() => router.push('/(screens)/profile')}>
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
            // 🔽 Главное: при потере фокуса — скрываем
            onBlur={() => {
              setIsSearching(false);
              setSearchText('');
            }}
            // Клавиатура скроется — и onBlur сработает
          />
        ) : (
          <Text style={style.libaryInput}>{displayText}</Text>
        )}

        <TouchableOpacity
          style={style.searchButton}
          onPress={() => {
            if (isSearching) {
              // Если уже в поиске — сбрасываем
              setIsSearching(false);
              setSearchText('');
            } else {
              // Включаем
              setIsSearching(true);
              // Клавиатура появится сама из-за autoFocus
            }
          }}
        >
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
