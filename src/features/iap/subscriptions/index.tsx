/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Platform } from 'react-native';
import { Modal } from '@translate-us/components';
import {
  useIAP,
  withIAPContext,
  requestSubscription,
  requestPurchase,
  Purchase,
  IapIosSk2,
} from 'react-native-iap';
import { purchaseService } from '@translate-us/services';
import { Content } from './content';
import { iosSubscriptions, iosProducts } from './constants';

export const Subscriptions: React.FC = () => {
  const {
    connected,
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
  const [isPurchaseHistoryLoaded, setPurchaseHistoryLoaded] =
    React.useState(false);

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
      } finally {
        setPurchaseHistoryLoaded(true);
      }
    };

    if (connected) {
      handleGetSubscriptions();
      handleGetProducts();
      handleGetPurchaseHistory();
    }
  }, [connected]);

  React.useEffect(() => {
    const checkActiveSubscription = async (purchases: Purchase[]) => {
      try {
        if (Platform.OS === 'ios') {
          const promises = iosSubscriptions.ios.map(name =>
            IapIosSk2.subscriptionStatus(name),
          );
          const results = await Promise.all(promises);
          if (
            results &&
            results.length > 0 &&
            results.find(result => {
              if (result && result.length > 0) {
                return result.find(status => status.state === 'subscribed');
              }
            })
          ) {
            toggleModal(false);
          } else {
            // Check for products
            const productPurchase = await purchaseService.getPurchase();
            if (productPurchase) {
              const nowInMilliseconds = Date.now();
              if (
                productPurchase.transactionDate + 24 * 60 * 60 * 1000 >
                nowInMilliseconds
              ) {
                toggleModal(false);
              } else {
                toggleModal(true);
              }
            } else {
              toggleModal(true);
            }
          }
        }

        if (Platform.OS === 'android') {
          // for (let i = 0; i < purchases.length; i++) {
          //   if (SUBSCRIPTIONS.ALL.includes(purchases[i].productId)) {
          //     toggleModal(false);
          //     return;
          //   }
          // }
          if (purchases.length > 0) {
            toggleModal(false);
          } else {
            // Check for products
            const productPurchase = await purchaseService.getPurchase();
            if (productPurchase) {
              const nowInMilliseconds = Date.now();
              if (
                productPurchase.transactionDate + 24 * 60 * 60 * 1000 >
                nowInMilliseconds
              ) {
                toggleModal(false);
              } else {
                toggleModal(true);
              }
            } else {
              toggleModal(true);
            }
          }
        }
      } catch (error) {
        console.log('Error checking for active subscription: ', error);
        toggleModal(true);
      }
    };

    if (isPurchaseHistoryLoaded) {
      checkActiveSubscription(purchaseHistory);
    }
  }, [isPurchaseHistoryLoaded, purchaseHistory]);

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

  // Handle Purchase completed

  React.useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase?.productId) {
          if (iosProducts.ios.includes(currentPurchase.productId)) {
            // Save receipt
            await purchaseService.setPurchase(currentPurchase);
          }
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: iosSubscriptions.ios.includes(
              currentPurchase.productId,
            )
              ? false
              : true,
          });
          toggleModal(false);
        }
      } catch (error) {
        console.log('Error validating current purchase: ', error);
      }
    };

    checkCurrentPurchase();
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
