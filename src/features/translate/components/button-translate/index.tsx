import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '@translate-us/styles';

export const ButtonTranslate = () => {
  const [isActive, setActive] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
    },
    button: {
      width: 100,
      height: 100,
      backgroundColor: isActive ? colors.primary[800] : colors.primary[600],
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPressIn={() => setActive(true)}
        onPressOut={() => setActive(false)}
      />
    </View>
  );
};
