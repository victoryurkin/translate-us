import React from 'react';
import { Router } from '../pages/router';
import { AuthProvider } from '@translate-us/context';

export const AppMiddleware = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
