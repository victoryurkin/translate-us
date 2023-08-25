import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <React.Fragment>
      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
