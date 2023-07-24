import React from 'react';
import { MicrophoneIcon } from 'react-native-heroicons/solid';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '@translate-us/styles';

interface ButtonTranslateProps {
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export const ButtonTranslate: React.FC<ButtonTranslateProps> = ({
  onPressIn,
  onPressOut,
}) => {
  const [isActive, setActive] = React.useState(false);

  const handlePressIn = () => {
    setActive(true);
    onPressIn && onPressIn();
  };

  const handlePressOut = () => {
    setActive(false);
    onPressOut && onPressOut();
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
    },
    button: {
      width: 100,
      height: 100,
      backgroundColor: isActive ? colors.primary[800] : colors.primary[600],
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <MicrophoneIcon color="white" width={50} height={50} />
      </Pressable>
    </View>
  );
};
