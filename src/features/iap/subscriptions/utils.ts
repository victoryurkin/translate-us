import { Platform } from 'react-native';
import { Purchase, validateReceiptIos } from 'react-native-iap';
import { APP_STORE_SECRET } from '@env';

export const checkSubscriptionStatus = async (purchases: Purchase[]) => {
  if (Platform.OS === 'ios') {
    if (purchases.length > 0) {
      const sortedPurchases = purchases.sort(
        (a, b) => b.transactionDate - a.transactionDate,
      );
      const latestReceipt = sortedPurchases[0].transactionReceipt;

      const isTestEnvironment = __DEV__;
      const decodedReceipt = await validateReceiptIos({
        receiptBody: {
          'receipt-data': latestReceipt,
          password: APP_STORE_SECRET,
        },
        isTest: isTestEnvironment,
      });
      const { latest_receipt_info: latestReceiptInfo } = decodedReceipt;
      const isSubscriptionActive = !!latestReceiptInfo.find((receipt: any) => {
        const expirationInMilliseconds = Number(receipt.expires_date_ms);
        const nowInMilliseconds = Date.now();
        return expirationInMilliseconds > nowInMilliseconds;
      });
      if (isSubscriptionActive) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};
