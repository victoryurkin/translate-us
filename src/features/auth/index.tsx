import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Layout } from '@translate-us/components';
import { colors, spacing } from '@translate-us/styles';
import { useTranslation } from '@translate-us/i18n';
import { BottomBar } from './components';
import { Signin } from './signin';
import { Signup } from './signup';
import { ForgotPassword } from './forgot-password';

enum VirtualRoutes {
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
}

export const Auth: React.FC = () => {
  const [virtualRoute, setVirtualRoute] = React.useState<VirtualRoutes>(
    VirtualRoutes.SIGN_IN,
  );

  const { t } = useTranslation();

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Image source={require('./assets/main.png')} style={styles.image} />
        </View>
        <ScrollView style={styles.mainBar}>
          {virtualRoute === VirtualRoutes.SIGN_IN && (
            <Signin
              onForgotPassword={() =>
                setVirtualRoute(VirtualRoutes.FORGOT_PASSWORD)
              }
            />
          )}
          {virtualRoute === VirtualRoutes.SIGN_UP && <Signup />}
          {virtualRoute === VirtualRoutes.FORGOT_PASSWORD && (
            <ForgotPassword
              onSuccess={() => setVirtualRoute(VirtualRoutes.SIGN_IN)}
            />
          )}
        </ScrollView>
        <BottomBar
          title={
            virtualRoute === VirtualRoutes.SIGN_IN
              ? t('auth.create_account')
              : t('auth.signin_account')
          }
          onPress={() =>
            setVirtualRoute(
              virtualRoute === VirtualRoutes.SIGN_IN
                ? VirtualRoutes.SIGN_UP
                : VirtualRoutes.SIGN_IN,
            )
          }
        />
      </View>
    </Layout>
  );
};

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
