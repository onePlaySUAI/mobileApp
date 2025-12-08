import { View, Text, TextInput, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useState, useEffect } from 'react';

import { Colors } from '../../constants/colors';
import { getProfileInfoStyle } from '@/assets/styles_old/profile/profileInfo';
import { ProfileInfoProps } from '@/types/components';
import { setUser } from '@/store/userSlice';

export default function ProfileInfo({ appTheme }: ProfileInfoProps) {
  const { name, email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);
  const { styles, colors } = getProfileInfoStyle(appTheme);

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
      <View style={styles.nameBlock}>
        {isEditingName ? (
          <TextInput
            style={styles.nameInput}
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
            android_ripple={{
              color: Colors.accent,
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.name}>{name || 'Tap to set name'}</Text>
          </Pressable>
        )}
      </View>

      {/* Email */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Your email:</Text>
        <TextInput
          style={styles.input}
          placeholder="example@mail.com"
          placeholderTextColor={colors.Text.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          defaultValue={email}
          returnKeyType="done"
        />
      </View>
    </View>
  );
}