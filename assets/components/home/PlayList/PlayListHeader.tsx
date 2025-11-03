import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets, type EdgeInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import BackIcon from "../../icons/BackIcon";
import PlayListStartIcon from "../../icons/PlayListStartIcon";


interface ProfileHeaderProps {
  isDark: boolean;
  onBack?: () => void;
  title?: string;
}

export default function ProfileHeader({
  isDark,
  title,
  onBack = () => { },
}: ProfileHeaderProps) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = getStyles(isDark, insets.top);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <BackIcon></BackIcon>
        </TouchableOpacity>
        <MaskedView
          maskElement={<Text style={styles.titleMask}>{title}</Text>}
        >
          <LinearGradient
            colors={['#FF0000', '#A54A22', '#1DB954']}
            locations={[0, 0.35, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
          </LinearGradient>
        </MaskedView>
        <TouchableOpacity onPress={() => console.log("click start playlist")} style={styles.backButton}>
          <PlayListStartIcon></PlayListStartIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getStyles(isDark: boolean, topInset: number) {
  const marginTop = topInset;
  const COLORS = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    borderColor: isDark ? '#38383a' : '#e5e5e5',
  };

  return StyleSheet.create({

    headerContainer: {
      backgroundColor: COLORS.background,
      paddingTop: marginTop,
      paddingBottom: 16,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3, // Android shadow
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 0,
      paddingVertical: 10,
      height: 56,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonText: {
      fontSize: 24,
      color: COLORS.text,
      fontWeight: '400',
    },
    titleMask: {
      fontSize: 20,
      fontWeight: '600',
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
    },
    spacer: {
      width: 40,
    },
  });
}