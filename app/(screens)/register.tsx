import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, useColorScheme } from 'react-native';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { getRegisterStyle, GRADIENT_COLORS } from '@/assets/styles/register';
import { useDispatch } from 'react-redux';
import {AppDispatch, setUser} from '@/store/reducers';

export default function Register() {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = getRegisterStyle(isDarkMode);

  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    if (email && password && name) {
      await SecureStore.setItemAsync('userEmail', email);
      dispatch(setUser({ name, email }));
      setRegistered(true);
    } else setErrorText('Поле email или пароль или имя не могут быть пустыми');
  };

  if (registered) {
    return <Redirect href="/home" />;
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

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text
        style={styles.errorText}
      >
        {errorText}
      </Text>


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
    </View>
  );
}
