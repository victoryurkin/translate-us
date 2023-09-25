import React from 'react';
import { Router } from '../pages/router';
import { AuthProvider, AppProvider } from '@translate-us/context';
import '@translate-us/i18n';
import { Settings } from 'react-native-fbsdk-next';

Settings.setAppID('1257038251678701');
Settings.initializeSDK();

export const AppMiddleware = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </AppProvider>
  );
};
