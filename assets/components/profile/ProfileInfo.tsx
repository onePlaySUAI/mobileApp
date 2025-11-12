import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProfileInfoProps {
  isDark: boolean;
}

export default function ProfileInfo({ isDark }: ProfileInfoProps) {
  const { name, email } = useSelector((state: RootState) => state.user);
  const style = getProfileInfoStyle(isDark);

  return (
    <View style={style.nameBlock}>
      <Text style={style.name}>{name}</Text>
      <Text style={style.email}>{email}</Text>
    </View>
  );
}

function getProfileInfoStyle(isDark: boolean) {
  const COLORS = {
    text: isDark ? '#ffffff' : '#2e2e2e',
    textSecondary: isDark ? '#bfbfbf' : '#797979',
  };

  return StyleSheet.create({
    nameBlock: {
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 8,
    },
    name: {
      color: COLORS.text,
      fontSize: 22,
      fontWeight: '600',
    },
    email: {
      color: COLORS.textSecondary,
      fontSize: 20,
      marginTop: 6,
    },
    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: isDark ? '#2b2b2e' : '#ededf0',
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 16,
      gap: 10,
    },
    phoneLabel: {
      color: COLORS.text,
      fontSize: 14,
    },
    phoneInput: {
      color: COLORS.textSecondary,
      fontSize: 14,
      minWidth: 160,
    },
  });
}
