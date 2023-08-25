import React from 'react';
import { Router } from '../pages/router';
import { AuthProvider, AppProvider } from '@translate-us/context';
import '@translate-us/i18n';

export const AppMiddleware = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </AppProvider>
  );
};
