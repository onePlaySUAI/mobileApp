import React from "react";
import {Modal, Text, View, Pressable} from "react-native";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import getModalStyles from "@/assets/styles/songOptionsModal";

interface SongOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  song: {
    title: string;
    artist: string;
  };
}

export default function SongOptionsModal({visible, onClose, isDarkMode, song,}: SongOptionsModalProps) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = getModalStyles(isDarkMode, insets.bottom);

  if (!song) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Background overlay */}
      <View style={styles.overlay}>
        {/* Modal content */}
        <View style={styles.container}>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.artist}>{song.artist}</Text>

          <View style={styles.divider} />

          <Pressable style={styles.optionButton}>
            <Text style={styles.optionText}>Add to Playlist</Text>
          </Pressable>

          <Pressable style={styles.optionButton}>
            <Text style={styles.optionText}>Share</Text>
          </Pressable>

          <Pressable style={styles.optionButton}>
            <Text style={[styles.optionText, { color: "#e74c3c" }]}>Delete</Text>
          </Pressable>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
