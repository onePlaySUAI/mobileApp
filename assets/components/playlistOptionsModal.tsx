import React from 'react';
import { Modal, Text, View, Pressable } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import getModalStyles from '@/assets/styles/trackOptionsModal';
import { PlaylistOptionsModalProps } from '@/types/components';

export default function PlaylistOptionsModal({
  visible,
  onClose,
  appTheme,
  playlist,
  onRename,
  onEditCover,
  onShare,
  onDelete,
}: PlaylistOptionsModalProps) {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = getModalStyles(appTheme, insets.bottom);

  if (!playlist) return null;

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
          <Text style={styles.title}>{playlist.name}</Text>
          <Text style={styles.artist}>{playlist.songs.length} songs</Text>

          <View style={styles.divider} />

          <Pressable onPress={onRename} style={styles.optionButton}>
            <Text style={styles.optionText}>Rename</Text>
          </Pressable>

          <Pressable onPress={onEditCover} style={styles.optionButton}>
            <Text style={styles.optionText}>Edit Playlist Cover</Text>
          </Pressable>

          <Pressable onPress={onShare} style={styles.optionButton}>
            <Text style={styles.optionText}>Share</Text>
          </Pressable>

          <Pressable onPress={onDelete} style={[styles.optionButton]}>
            <Text style={[styles.optionText, { color: '#e74c3c' }]}>
              Delete
            </Text>
          </Pressable>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
