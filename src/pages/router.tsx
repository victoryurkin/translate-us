/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Translate } from '@translate-us/features';
import { Subscriptions } from '@translate-us/features';
import { useAuth, UserProvider, useUser, useApp } from '@translate-us/context';
import { uidNoIap } from '@translate-us/constants';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Netinfo } from '@translate-us/components';

const Stack = createNativeStackNavigator();

const TranslateMiddleware = () => {
  const { isLoading, user } = useUser();
  const { setLoading } = useApp();

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return <React.Fragment>{user && <Translate />}</React.Fragment>;
};

const UserMiddleware = () => {
  const { authUser } = useAuth();
  const uid = React.useMemo(() => authUser!.uid, [authUser]);
  return (
    <UserProvider uid={uid}>
      <TranslateMiddleware />
    </UserProvider>
  );
};

export const Router = () => {
  const { isLoading, authUser } = useAuth();
  const { setLoading } = useApp();

  React.useEffect(() => {
    SplashScreen.hide();

    // Request permissions iOS
    check(PERMISSIONS.IOS.MICROPHONE).then(result => {
      if (result !== RESULTS.GRANTED) {
        request(PERMISSIONS.IOS.MICROPHONE);
      }
    });

    // Request permissions Android
    check(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
      if (result !== RESULTS.GRANTED) {
        request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      }
    });
  }, []);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <React.Fragment>
      {!isLoading && (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Translate">
            <Stack.Screen
              name="Translate"
              component={UserMiddleware}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {!isLoading && !!authUser && authUser.uid !== uidNoIap && (
        <Subscriptions />
      )}
      <Netinfo />
    </React.Fragment>
  );
};
