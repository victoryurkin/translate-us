import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth, Translate } from '@translate-us/features';
import { useAuth } from '@translate-us/context';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const { isLoading, authUser } = useAuth();

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
    </React.Fragment>
  );
};
