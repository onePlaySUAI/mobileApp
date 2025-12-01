import { StyleSheet} from 'react-native';
import { AppTheme, THEME_COLORS } from '@/assets/constants/colors';
import { BottomNavigationStyle } from '@/types/components';

export const getBottomNavigationStyle = (
  appTheme: AppTheme,
  marginBottom: number
) => {
  const themeColors = THEME_COLORS[appTheme];
  return StyleSheet.create<BottomNavigationStyle>({
    container: {
      flexDirection: 'row',
      backgroundColor: themeColors.Bottom.background,
      paddingTop: 12,
      paddingBottom: marginBottom + 12,
      paddingHorizontal: 20,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopWidth: 1,
    },
    tab: {
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: themeColors.Bottom.tabActive,
    },
    inactiveIcon: {
      color: themeColors.Bottom.iconInactive,
    },
    gradientIcon: {
      padding: 8,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
