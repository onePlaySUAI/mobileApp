import { View, TouchableOpacity } from "react-native";
import { getBottomNavigationStyle } from "@/assets/styles/bottomNavigation";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";
import SearchIcon from "./icons/SearchIcon";
import LibraryIcon from "./icons/LibraryIcon";

interface BottomNavigationProps {
  activeTab: 'search' | 'queue';
  onTabPress: (tab: 'search' | 'queue') => void;
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
      >
        {activeTab === 'search' ? (
          <SearchIcon width={24} height={24} />
        ) : (
          <SearchIcon width={24} height={24} color="#ffffff" />
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[style.tab, activeTab === 'queue' && style.activeTab]} 
        onPress={() => onTabPress('queue')}
      >
        {activeTab === 'queue' ? (
          <LibraryIcon width={24} height={24} />
        ) : (
          <LibraryIcon width={24} height={24} color="#ffffff" />
        )}
      </TouchableOpacity>
    </View>
  );
}
