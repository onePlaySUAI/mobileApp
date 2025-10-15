import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface headerStyle {
  container: ViewStyle,
  text: TextStyle,
}

// Нельзя отсюда вызвать useSafeAreaInsets, поэтому будет вызываться от компонента
export const getHeaderStyle = (isDarkMode: boolean, marginTop: number) => {
  const marginBottom = 10;

  return StyleSheet.create<headerStyle>({
    container: {
      backgroundColor: '#000000',
      height: 30 + marginTop + marginBottom,
      paddingBottom: marginBottom,
      alignItems: 'center',
      borderBottomRightRadius: 20,
    },
    text: {
      color: '#ff0000',
      marginTop: marginTop,
      fontSize: 20,
    },
  })
}