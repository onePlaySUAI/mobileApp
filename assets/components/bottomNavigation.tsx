import { View, TouchableOpacity, useColorScheme } from 'react-native';
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context';
import SearchIcon from './icons/SearchIcon';
import LibraryIcon from './icons/LibraryIcon';
import { getBottomNavigationStyle } from '../styles/home/bottomNavigation';
import { BottomNavigationProps } from '@/types/components';
import { THEME_COLORS } from '../constants/colors';

export default function BottomNavigation({
  appTheme,
  activeTab,
  onTabPress,
}: BottomNavigationProps) {
  const themeColors = THEME_COLORS[appTheme];
  const insets: EdgeInsets = useSafeAreaInsets();
  const style = getBottomNavigationStyle(appTheme, insets.bottom);

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
          <SearchIcon
            width={24}
            height={24}
            color={themeColors.Bottom.iconInactive}
          />
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
          <LibraryIcon
            width={24}
            height={24}
            color={themeColors.Bottom.iconInactive}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
