/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { setup } from 'react-native-iap';
import { AppMiddleware } from '@translate-us/middleware';

setup({ storekitMode: 'STOREKIT2_MODE' });

function App(): JSX.Element {
  return <AppMiddleware />;
}

export default App;
