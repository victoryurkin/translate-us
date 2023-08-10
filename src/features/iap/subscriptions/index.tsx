/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Platform } from 'react-native';
import { Modal } from '@translate-us/components';
import {
  useIAP,
  withIAPContext,
  requestSubscription,
  requestPurchase,
  validateReceiptIos,
} from 'react-native-iap';
import { APP_STORE_SECRET } from '@env';
import { Content } from './content';
import { iosSubscriptions, iosProducts } from './constants';

export const Subscriptions: React.FC = () => {
  const {
    connected,
    subscriptions,
    products,
    purchaseHistory,
    currentPurchase,
    finishTransaction,
    getSubscriptions,
    getProducts,
    getPurchaseHistory,
  } = useIAP();

  const subscriptionSkus = Platform.select(iosSubscriptions);

  const productSkus = Platform.select(iosProducts);

  const [isOpen, toggleModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleGetSubscriptions = async () => {
      try {
        if (subscriptionSkus) {
          await getSubscriptions({ skus: subscriptionSkus });
        }
      } catch (error) {
        console.log('Error getting subscriptions: ', error);
      }
    };

    const handleGetProducts = async () => {
      try {
        if (productSkus) {
          await getProducts({ skus: productSkus });
        }
      } catch (error) {
        console.log('Error getting products: ', error);
      }
    };

    const handleGetPurchaseHistory = async () => {
      try {
        await getPurchaseHistory();
      } catch (error) {
        console.log('Error getting purchase history: ', error);
      }
    };

    if (connected) {
      handleGetSubscriptions();
      handleGetProducts();
      handleGetPurchaseHistory();
    }
  }, [connected]);

  React.useEffect(() => {
    if (
      connected &&
      purchaseHistory &&
      subscriptionSkus &&
      productSkus &&
      purchaseHistory.find(
        x =>
          x.productId ===
          (subscriptionSkus[0] || subscriptionSkus[1] || productSkus[0]),
      )
    ) {
      console.log('Already purchased');
    } else {
      toggleModal(true);
    }
  }, [subscriptions, products, purchaseHistory]);

  // Purchase Subscription

  const handlePurchaseSubscription = async (productId: string) => {
    setLoading(true);
    try {
      await requestSubscription({
        sku: productId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Purchase Product

  const handlePurchaseProduct = async (productId: string) => {
    setLoading(true);
    try {
      await requestPurchase({
        sku: productId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Purchase handler

  React.useEffect(() => {
    const checkCurrentPurchase = async (purchase: any) => {
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            if (Platform.OS === 'ios') {
              const isTestEnvironment = __DEV__;

              //send receipt body to apple server to validete
              // isTestEnvironment,

              const appleReceiptResponse = await validateReceiptIos({
                receiptBody: {
                  'receipt-data': receipt,
                  password: APP_STORE_SECRET,
                },
                isTest: isTestEnvironment,
              });

              //if receipt is valid
              if (appleReceiptResponse) {
                const { status } = appleReceiptResponse;
                if (status) {
                  // console.log('!!!', appleReceiptResponse);
                }
              }
              return;
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  return (
    <Modal isOpen={isOpen}>
      <Content
        isLoading={isLoading}
        onSubscriptionPurchase={handlePurchaseSubscription}
        onProductPurchase={handlePurchaseProduct}
      />
    </Modal>
  );
};

export default withIAPContext(Subscriptions);
