import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth, Subscriptions, Translate } from '@translate-us/features';
import { useAuth } from '@translate-us/context';
import { Text } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const { isLoading, authUser } = useAuth();

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

  return (
    <React.Fragment>
      {/* {isLoading && <MoonLoader color="blue" />} */}
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={authUser ? 'Translate' : 'Auth'}>
            {!authUser && (
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
            )}
            {!!authUser && (
              <Stack.Screen
                name="Translate"
                component={Translate}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {/* {!__DEV__ && <Subscriptions />} */}
      <Subscriptions />
    </React.Fragment>
  );
};
