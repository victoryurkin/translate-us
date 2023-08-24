/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Platform } from 'react-native';
import Purchases, {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesPackage,
} from 'react-native-purchases';
import { Modal } from '@translate-us/components';
import { useAuth } from '@translate-us/context';
import { Content } from './content';

export const Subscriptions: React.FC = () => {
  const [isOpen, toggleModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [offerings, setOfferings] = React.useState<PurchasesOfferings>();
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

  React.useEffect(() => {
    const loadCustomerInfo = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        if (customerInfo.entitlements.active.appaccess === undefined) {
          toggleModal(true);
        }
      } catch (error) {
        console.log('Error loading RevenueCat customer info: ', error);
      }
    };
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
      if (customerInfo.entitlements.active.appaccess === undefined) {
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
      setLoading(true);
      await Purchases.purchasePackage(pckg);
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
    } catch (error) {
      console.log('Error restoring purchase: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      {offerings && (
        <Content
          isLoading={isLoading}
          offerings={offerings}
          onPurchase={handlePurchase}
          onRestore={handleRestore}
        />
      )}
    </Modal>
  );
};

export default Subscriptions;
