import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Text, Pressable, useColorScheme } from 'react-native';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { getRegisterStyle, GRADIENT_COLORS } from '@/assets/styles/register';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/reducers';
import { AppDispatch } from '@/store/store';
import { getAppTheme } from '@/assets/constants/colors';

export default function Register() {
  const appTheme = getAppTheme();
  
  const { styles, colors } = getRegisterStyle(appTheme);

  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [registered, setRegistered] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const getUser = useCallback(async () => {
    // для теста
    // await SecureStore.deleteItemAsync('user');

    const savedUser = await SecureStore.getItemAsync('user');
    if (savedUser === null) return;

    const user = JSON.parse(savedUser);
    if (user.name !== undefined && user.email !== undefined) {
      dispatch(setUser({ name: user.name, email: user.email }));
      setRegistered(true);
    }
  }, [dispatch]);

  const handleRegister = async () => {
    if (email && password && name) {
      await SecureStore.setItemAsync('user', JSON.stringify({ email, name }));
      dispatch(setUser({ name, email }));
      setRegistered(true);
    } else setErrorText('Поле email или пароль или имя не могут быть пустыми');
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (registered) {
    return <Redirect href="/screens/home" />;
  }

  if (redirectToLogin) {
    return <Redirect href="/screens/login" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Acrrcount</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={colors.Text.placeholder}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.Text.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.Text.placeholder}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showHideButton}
        >
          <Text
            style={styles.showHideText}
          >
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.errorText}>{errorText}</Text>

      <Pressable onPress={handleRegister} style={{ width: '100%' }}>
        <LinearGradient
          colors={GRADIENT_COLORS as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </LinearGradient>
      </Pressable>

      <Pressable
        onPress={() => setRedirectToLogin(true)}
        style={styles.loginLink}
      >
        <Text
          style={styles.loginText}
        >
          Уже регистрировались?
        </Text>
      </Pressable>
    </View>
  );
}
