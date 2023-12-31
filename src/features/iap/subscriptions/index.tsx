/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  View,
  AppState,
} from 'react-native';
import Purchases, {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesPackage,
} from 'react-native-purchases';
import { Modal } from '@translate-us/components';
import { useAuth } from '@translate-us/context';
import { Content } from './content';
import { isActive, isPromo } from './utils';
import { log } from '@translate-us/clients';

export const Subscriptions: React.FC = () => {
  const [isOpen, toggleModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [offerings, setOfferings] = React.useState<PurchasesOfferings>();
  const [isPromotion, setPromo] = React.useState(true);
  const { authUser } = useAuth();

  React.useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    if (Platform.OS === 'ios') {
      Purchases.configure({
        apiKey: 'appl_yWposVaqkJwWslSPvyMtqmsOJcU',
        appUserID: authUser?.uid,
      });
    } else if (Platform.OS === 'android') {
      Purchases.configure({
        apiKey: 'goog_dNvpEtKvJjHCiChhHNFThHvnOlP',
        appUserID: authUser?.uid,
      });
    }
  }, []);

  const loadCustomerInfo = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      if (!isActive(customerInfo.entitlements.active)) {
        toggleModal(true);
      } else {
        toggleModal(false);
      }
    } catch (error) {
      console.log('Error loading RevenueCat customer info: ', error);
    }
  };

  React.useEffect(() => {
    loadCustomerInfo();
  }, []);

  React.useEffect(() => {
    const loadOfferings = async () => {
      const items = await Purchases.getOfferings();
      setOfferings(items);
    };
    loadOfferings();
  }, []);

  React.useEffect(() => {
    const customerInfoUpdateHandler = (customerInfo: CustomerInfo) => {
      if (!isActive(customerInfo.entitlements.active)) {
        toggleModal(true);
      } else {
        toggleModal(false);
      }
    };
    Purchases.addCustomerInfoUpdateListener(customerInfoUpdateHandler);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(customerInfoUpdateHandler);
    };
  }, []);

  const handlePurchase = async (pckg: PurchasesPackage) => {
    try {
      log.event('started_purchase');
      setLoading(true);
      await Purchases.purchasePackage(pckg);
      log.event('purchased_package');
    } catch (error) {
      console.log('Error purchasing package: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    try {
      setLoading(true);
      await Purchases.restorePurchases();
      log.event('restored_purchase');
    } catch (error) {
      console.log('Error restoring purchase: ', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const stateChangeHandler = async (newAppState: string) => {
      if (newAppState === 'active') {
        loadCustomerInfo();
        if (authUser) {
          setPromo(isPromo(authUser.metadata.creationTime));
        }
      }
    };
    const appStateSubscription = AppState.addEventListener(
      'change',
      stateChangeHandler,
    );
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  React.useEffect(() => {
    if (authUser?.metadata?.creationTime) {
      setPromo(isPromo(authUser.metadata.creationTime));
    }
  }, []);

  return (
    <Modal isOpen={isOpen && !!offerings && !isPromotion}>
      {offerings && (
        <Content
          isLoading={isLoading}
          offerings={offerings}
          onPurchase={handlePurchase}
          onRestore={handleRestore}
        />
      )}
      {!offerings && (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </Modal>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
