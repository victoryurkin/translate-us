import React from 'react';
import { Router } from '../pages/router';
import { AuthProvider, UserProvider } from '@translate-us/context';
import '@translate-us/i18n';

export const AppMiddleware = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </AuthProvider>
  );
};
