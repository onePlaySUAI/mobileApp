import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { setUser } from "@/store/reducers";

interface ProfileInfoProps {
  isDark: boolean;
}

export default function ProfileInfo({ isDark }: ProfileInfoProps) {
  const { name, email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);
  const style = getProfileInfoStyle(isDark);

  useEffect(() => {
    setTempName(name);
  }, [name]);

  const handleNamePress = () => {
    setIsEditingName(true);
    setTempName(name);
  };

  const handleNameSubmit = () => {
    const newName = tempName.trim();
    if (newName) {
      dispatch(setUser({ name: newName, email }));
    }
    setIsEditingName(false);
  };

  const handleNameBlur = () => {
    handleNameSubmit();
  };

  return (
    <View>
      <View style={style.nameBlock}>
        {isEditingName ? (
          <TextInput
            style={style.nameInput}
            value={tempName}
            onChangeText={setTempName}
            onBlur={handleNameBlur}
            onSubmitEditing={handleNameSubmit}
            autoFocus
            selectTextOnFocus
            returnKeyType="done"
          />
        ) : (
          <Pressable
            onPress={handleNamePress}
            android_ripple={{ color: isDark ? '#333' : '#ccc' }}
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 }
            ]}
          >
            <Text style={style.name}>{name || "Tap to set name"}</Text>
          </Pressable>
        )}
      </View>

      {/* Email */}
      <View style={style.inputRow}>
        <Text style={style.label}>Your email:</Text>
        <TextInput
          style={style.input}
          placeholder="example@mail.com"
          placeholderTextColor={isDark ? "#a6a6a6" : "#888"}
          keyboardType="email-address"
          autoCapitalize="none"
          defaultValue={email}
          returnKeyType="done"
        />
      </View>

      {/* Телефон */}
      <View style={style.inputRow}>
        <Text style={style.label}>Your tel. number:</Text>
        <TextInput
          style={style.input}
          placeholder="+7 (999) 999 9999"
          placeholderTextColor={isDark ? "#a6a6a6" : "#888"}
          keyboardType="phone-pad"
          returnKeyType="done"
        />
      </View>
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
      paddingBottom: 16,
    },
    name: {
      color: COLORS.text,
      fontSize: 22,
      fontWeight: '600',
    },
    nameInput: {
      color: COLORS.text,
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      minWidth: 200,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.textSecondary,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: isDark ? '#2b2b2e' : '#ededf0',
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 12,
      gap: 10,
    },
    label: {
      color: COLORS.text,
      fontSize: 14,
    },
    input: {
      color: COLORS.text,
      fontSize: 14,
      minWidth: 160,
    },
  });
}
