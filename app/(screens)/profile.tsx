import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  useColorScheme,
} from 'react-native';
import ProfileHeader from '@/assets/components/profile/ProfileHeader';
import ProfileAvatar from '@/assets/components/profile/ProfileAvatar';
import ProfileInfo from '@/assets/components/profile/ProfileInfo';
import ProfileServices from '@/assets/components/profile/ProfileServices';
import { getProfileStyle } from '@/assets/styles_old/profile/profile';
import { getAppTheme } from '@/assets/constants/colors';


export default function ProfileScreen() {
  const appTheme = getAppTheme(useColorScheme());
  const style = getProfileStyle(appTheme);

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
            <ProfileHeader appTheme={appTheme} />
            <ProfileAvatar appTheme={appTheme} />
            <ProfileInfo appTheme={appTheme} />
            <ProfileServices appTheme={appTheme} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
