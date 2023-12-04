import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Router } from '../pages/router';
import { AuthProvider, AppProvider } from '@translate-us/context';
import '@translate-us/i18n';
import { Settings } from 'react-native-fbsdk-next';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  LanguageSelectorProvider,
  LanguageSelectorModal,
} from '@translate-us/components';

Settings.setAppID('1257038251678701');
Settings.initializeSDK();

export const AppMiddleware = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <LanguageSelectorProvider>
          <GestureHandlerRootView>
            <View style={styles.container}>
              <BottomSheetModalProvider>
                <Router />
                <LanguageSelectorModal />
              </BottomSheetModalProvider>
            </View>
          </GestureHandlerRootView>
        </LanguageSelectorProvider>
      </AuthProvider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
