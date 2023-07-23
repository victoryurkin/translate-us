import React from 'react';
import { Router } from '../pages/router';
import { AuthProvider } from '@translate-us/context';
import '@translate-us/i18n';

export const AppMiddleware = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
