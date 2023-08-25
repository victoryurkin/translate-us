import { PurchasesEntitlementInfo } from 'react-native-purchases';
export const isProductActive = (products: unknown) => {
  try {
    const purchase = products as { latestPurchaseDateMillis: number };
    const expirationInMilliseconds =
      purchase.latestPurchaseDateMillis + 24 * 60 * 60 * 1000;
    const nowInMilliseconds = Date.now();
    return expirationInMilliseconds > nowInMilliseconds;
  } catch (error) {
    return false;
  }
};

interface ActiveEntitlement {
  [key: string]: PurchasesEntitlementInfo;
}

export const isActive = (active: ActiveEntitlement) => {
  // Check for subscriptions
  if (active.subscriptions !== undefined) {
    return true;
  }

  // Check for products
  if (active.nrsubscriptions) {
    if (isProductActive(active.nrsubscriptions)) {
      return true;
    }
  }
  return false;
};
