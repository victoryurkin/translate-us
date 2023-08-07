import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import { Modal } from '@translate-us/components';
import { useIAP, withIAPContext } from 'react-native-iap';
import { APP_STORE_SECRET } from '@env';
import { Content } from './content';

const screenDimensions = Dimensions.get('screen');

export const Subscriptions: React.FC = () => {
  // const {
  //   connected,
  //   subscriptions,
  //   purchaseHistory,
  //   getSubscriptions,
  //   getPurchaseHistory,
  // } = useIAP();

  // const subscriptionSkus = Platform.select({
  //   ios: ['subMonthly', 'subYearly'],
  // });

  // React.useEffect(() => {
  //   const handleGetSubscriptions = async () => {
  //     try {
  //       if (subscriptionSkus) {
  //         await getSubscriptions({ skus: subscriptionSkus });
  //       }
  //     } catch (error) {
  //       console.log('Error getting subscriptions: ', error);
  //     }
  //   };

  //   const handleGetPurchaseHistory = async () => {
  //     try {
  //       await getPurchaseHistory();
  //     } catch (error) {
  //       console.log('Error getting purchase history: ', error);
  //     }
  //   };

  //   if (connected) {
  //     handleGetSubscriptions();
  //     handleGetPurchaseHistory();
  //   }
  // }, [connected]);

  // React.useEffect(() => {
  //   if (
  //     connected &&
  //     purchaseHistory &&
  //     subscriptionSkus &&
  //     purchaseHistory.find(
  //       x => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
  //     )
  //   ) {
  //     console.log('Already purchased');
  //   } else {
  //     toggleModal(true);
  //   }
  // }, [purchaseHistory]);

  return (
    <Modal isOpen={true}>
      <Content />
    </Modal>
  );
};

export default withIAPContext(Subscriptions);
