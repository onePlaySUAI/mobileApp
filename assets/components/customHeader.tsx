import { View, Text } from "react-native";
import { getHeaderStyle } from "@/assets/styles/header";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";

interface headerProps {
  page: 'Home' | 'Library';
}
interface headerParams {
  params: headerProps;
}

export default function CustomHeader ({ params }: headerParams) {
  const colorScheme = useColorScheme();
  const insets: EdgeInsets = useSafeAreaInsets();
  const style = getHeaderStyle(colorScheme === 'dark', insets.top);

  return (
    <View style={style.container}>
      <Text style={style.text}>Header</Text>
    </View>
  )
}