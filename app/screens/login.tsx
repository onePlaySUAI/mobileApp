import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, useColorScheme } from 'react-native';
import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getRegisterStyle, GRADIENT_COLORS } from '@/assets/styles/register';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/reducers';
import { AppDispatch } from '@/store/store';

export default function Login() {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const { styles, colors } = getRegisterStyle(isDarkMode);

  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [redirectToRegister, setRedirectToRegister] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setErrorText('Email cannot be empty');
      return;
    }

    setTimeout(() => {
      // Mock login success
      dispatch(setUser({ name: '', email }));
      setLoggedIn(true);
    }, 500);
  };

  if (loggedIn) return <Redirect href="/screens/home" />;
  if (redirectToRegister)
    return <Redirect href="/screens/register" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.Text.tertiary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.Text.tertiary}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showHideButton}
        >
          <Text style={styles.showHideText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.errorText}>{errorText}</Text>

      <Pressable onPress={handleLogin} style={{ width: '100%' }}>
        <LinearGradient
          colors={GRADIENT_COLORS as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </Pressable>

      <Pressable
        onPress={() => setRedirectToRegister(true)}
        style={styles.loginLink}
      >
        <Text style={styles.loginText}>
          Нет аккаунта?
        </Text>
      </Pressable>
    </View>
  );
}
