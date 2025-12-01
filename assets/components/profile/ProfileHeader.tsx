import { View, Text, TouchableOpacity } from 'react-native';
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import BackIcon from '../icons/BackIcon';
import { Colors } from '../../constants/colors';
import { getProfileHeaderStyle } from '@/assets/styles/profile/profileHeader';
import { ProfileHeaderProps } from '@/types/components';



export default function ProfileHeader({
  appTheme,
  title = 'Profile',
  showBackButton = true,
}: ProfileHeaderProps) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = getProfileHeaderStyle(appTheme, insets.top);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <BackIcon></BackIcon>
          </TouchableOpacity>
        )}
        <MaskedView maskElement={<Text style={styles.titleMask}>{title}</Text>}>
          <LinearGradient
            colors={Colors.gradient.rainbow}
            locations={[0, 0.35, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
          </LinearGradient>
        </MaskedView>
        <View style={styles.spacer} />
      </View>
    </View>
  );
}
