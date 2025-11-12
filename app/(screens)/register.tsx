import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Pressable, useColorScheme } from 'react-native';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { getRegisterStyle, GRADIENT_COLORS } from '@/assets/styles/register';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/reducers';
import { AppDispatch } from '@/store/store';
import serverRegister, { registerResponse } from '@/assets/serverCalls/register';
import LoadingScreen from '@/assets/components/loading';

interface userInfo extends registerResponse {
  email: string;
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [registered, setRegistered] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = getRegisterStyle(isDarkMode);

  const getUser = async () => {
    await SecureStore.deleteItemAsync('user');

    const savedUser = await SecureStore.getItemAsync('user');
    if (!savedUser) return;

    const user = JSON.parse(savedUser) as userInfo;
    if (user.userName && user.userId && user.token) {
      await registerSuccess(user.userName, user.email, user.token, user.userId.toString());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const registerSuccess = async (userName: string, email: string, token: string, userId: string) => {
    await SecureStore.setItemAsync('user', JSON.stringify({ userId, token, userName, email }));
    dispatch(setUser({ name: userName, email }));
    setRegistered(true);
  };

  const handleRegister = async () => {
    setErrorText('');
    if (!email || !password || !name || !confirmPassword) {
      setErrorText('Не одно из полей не может быть пустым');
      return;
    }
    if (password !== confirmPassword) {
      setErrorText('Пароли не совпадают');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorText('Введенной почты не существует');
      return;
    }

    try {
      setIsLoading(true);
      const user = await serverRegister(name, password, confirmPassword);
      await registerSuccess(user.userName, email, user.token, user.userId.toString());
    } catch (e) {
      if (e === '401') setErrorText('Такой пользователь уже зарегистрирован!');
      else {
        console.error(e);
        setErrorText('Ошибка при регистрации');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

  if (registered) return <Redirect href="/home" />;
  if (redirectToLogin) return <Redirect href="/login" />;

  if (isLoading) {
    return <LoadingScreen isDarkMode={isDarkMode} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={{ width: '100%', position: 'relative' }}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: 'absolute', right: 12, top: 12 }}
        >
          <Text style={{ color: isDarkMode ? '#aaa' : '#777' }}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </Pressable>
      </View>

      <View style={{ width: '100%', position: 'relative', marginBottom: 15 }}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{ position: 'absolute', right: 12, top: 12 }}
        >
          <Text style={{ color: isDarkMode ? '#aaa' : '#777' }}>
            {showConfirmPassword ? 'Hide' : 'Show'}
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

      <Pressable onPress={() => setRedirectToLogin(true)} style={{ marginTop: 20 }}>
        <Text style={{ color: isDarkMode ? '#aaa' : '#777', textDecorationLine: 'underline' }}>
          Уже регистрировались?
        </Text>
      </Pressable>
    </View>
  );
}
