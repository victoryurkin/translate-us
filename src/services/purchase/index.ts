import AsyncStorage from '@react-native-async-storage/async-storage';
import { Purchase } from 'react-native-iap';
import { Products } from '@translate-us/constants';
import functions from '@react-native-firebase/functions';

enum AsyncStorageKeys {
  DAY = `translateus.iap.receipts.product.${Products.DAY}`,
}

export const getPurchase = async (): Promise<Purchase | undefined> => {
  try {
    const response = await AsyncStorage.getItem(AsyncStorageKeys.DAY);
    if (response) {
      const purchase = JSON.parse(response) as Purchase;
      return purchase;
    }
  } catch (error) {
    console.log('Error parsing a purchase: ', error);
  }
};

export const setPurchase = async (
  appType: string,
  purchase: Purchase,
): Promise<void> => {
  const saveReceipt = functions().httpsCallable('saveReceipt');
  saveReceipt({
    appType,
    purchase: {
      transactionReceipt: purchase,
    },
  });
};
