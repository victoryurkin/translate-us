import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Cog8ToothIcon } from 'react-native-heroicons/outline';
import { colors } from '@translate-us/styles';

interface ButtonSettingsProps {
  onPress?: () => void;
}

export const ButtonSettings: React.FC<ButtonSettingsProps> = ({ onPress }) => {
  const [isActive, setActive] = React.useState(false);

  const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      backgroundColor: isActive ? colors.primary[700] : undefined,
      borderRadius: 40,
      padding: 10,
      marginRight: 8,
    },
    icon: {
      opacity: isActive ? 1 : 0.9,
    },
  });

  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}>
      <Cog8ToothIcon width={40} height={40} color="white" style={styles.icon} />
    </Pressable>
  );
};
