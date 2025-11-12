import {ActivityIndicator, Text, View} from "react-native";
import React from "react";

interface loadingScreenParams {
  isDarkMode: boolean,
}

export default function LoadingScreen ({isDarkMode}: loadingScreenParams) {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#fff'
    }}>
      <ActivityIndicator size="large" color="#888" />
      <Text style={{ marginTop: 15, color: isDarkMode ? '#fff' : '#000' }}>
        Загрузка...
      </Text>
    </View>
  );
}