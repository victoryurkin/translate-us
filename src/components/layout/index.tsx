import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};
