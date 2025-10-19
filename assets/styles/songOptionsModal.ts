import { StyleSheet } from "react-native";

const LIGHT_THEME = {
  containerBackground: "#ffffff",
  textPrimary: "#000000",
  textSecondary: "#555555",
  divider: "#cccccc",
  buttonBackground: "#eeeeee",
};

const DARK_THEME = {
  containerBackground: "#1e1e1e",
  textPrimary: "#ffffff",
  textSecondary: "#bbbbbb",
  divider: "#333333",
  buttonBackground: "#333333",
};

export default function getModalStyles(isDark: boolean, paddingBottom: number) {
  const COLORS = isDark ? DARK_THEME : LIGHT_THEME;

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    container: {
      width: "100%",
      backgroundColor: COLORS.containerBackground,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
      paddingBottom: paddingBottom + 20,
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.textPrimary,
      marginBottom: 4,
      textAlign: "center",
    },
    artist: {
      fontSize: 14,
      color: COLORS.textSecondary,
      marginBottom: 16,
      textAlign: "center",
    },
    divider: {
      height: 1,
      width: "100%",
      backgroundColor: COLORS.divider,
      marginBottom: 16,
    },
    optionButton: {
      width: "100%",
      paddingVertical: 12,
      alignItems: "center",
    },
    optionText: {
      fontSize: 16,
      color: COLORS.textPrimary,
    },
    closeButton: {
      marginTop: 20,
      paddingVertical: 10,
      width: "100%",
      alignItems: "center",
      backgroundColor: COLORS.buttonBackground,
      borderRadius: 8,
    },
    closeText: {
      color: COLORS.textPrimary,
      fontWeight: "500",
    },
  });
}
