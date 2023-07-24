import { colors } from '@translate-us/styles';
import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  safeArea: {
    backgroundColor: colors.primary[600],
  },
});
