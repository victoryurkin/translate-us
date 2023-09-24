import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@translate-us/hooks';

export const Support = () => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Go Back:</Text>
      <Button onPress={() => goBack()} title="Back" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
  button: {
    color: 'blue',
  },
});
