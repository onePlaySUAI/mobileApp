import {
  View,
  useColorScheme,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import ProfileHeader from '@/assets/components/profile/ProfileHeader';
import ProfileAvatar from '@/assets/components/profile/ProfileAvatar';
import ProfileInfo from '@/assets/components/profile/ProfileInfo';
import ProfileServices from '@/assets/components/profile/ProfileServices';
import { getProfileStyle } from '@/assets/styles/profile';

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const style = getProfileStyle(isDark);

  return (
    <View style={style.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={style.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={style.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={style.scrollView}
          bounces={false}
        >
          <View style={style.container}>
            <ProfileHeader isDark={isDark} />
            <ProfileAvatar isDark={isDark} />
            <ProfileInfo isDark={isDark} />
            <ProfileServices isDark={isDark} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
