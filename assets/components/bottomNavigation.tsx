import { View, TouchableOpacity } from "react-native";
import { getBottomNavigationStyle } from "@/assets/styles/bottomNavigation";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";
import SearchIcon from "./icons/SearchIcon";
import LibraryIcon from "./icons/LibraryIcon";

interface BottomNavigationProps {
  activeTab: 'search' | 'library';
  onTabPress: (tab: 'search' | 'library') => void;
}

export default function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
  const colorScheme = useColorScheme();
  const insets: EdgeInsets = useSafeAreaInsets();
  const style = getBottomNavigationStyle(colorScheme === 'dark', insets.bottom);

  return (
    <View style={style.container}>
      <TouchableOpacity 
        style={[style.tab, activeTab === 'search' && style.activeTab]} 
        onPress={() => onTabPress('search')}
        hitSlop={10}
      >
        {activeTab === 'search' ? (
          <SearchIcon width={24} height={24} />
        ) : (
          <SearchIcon width={24} height={24} color="#ffffff" />
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[style.tab, activeTab === 'library' && style.activeTab]} 
        onPress={() => onTabPress('library')}
        hitSlop={10}
      >
        {activeTab === 'library' ? (
          <LibraryIcon width={24} height={24} />
        ) : (
          <LibraryIcon width={24} height={24} color="#ffffff" />
        )}
      </TouchableOpacity>
    </View>
  );
}
