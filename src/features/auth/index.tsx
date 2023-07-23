import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout } from '@translate-us/components';
import { colors, spacing } from '@translate-us/styles';
import { BottomBar } from './components';
import { Signin } from './signin';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    backgroundColor: colors.primary[600],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    width: 300,
    height: 120,
  },
  mainBar: {
    flex: 1,
  },
});

export const Auth: React.FC = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Image source={require('./assets/main.png')} style={styles.image} />
        </View>
        <View style={styles.mainBar}>
          <Signin
            onForgotPassword={() => console.log('!!! Forgot password')}
            onSuccess={() => console.log('!!! Success')}
          />
        </View>
        <BottomBar
          title="Create an account"
          onPress={() => console.log('!!!')}
        />
      </View>
    </Layout>
  );
};
