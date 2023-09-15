import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { colors, spacing } from '@translate-us/styles';
import { useTranslation } from '@translate-us/i18n';
import { products } from './constants';

interface ButtonProps {
  purchasePackage: PurchasesPackage;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ purchasePackage, onPress }) => {
  const [isPressed, setPressed] = React.useState(false);

  const { t } = useTranslation();

  return (
    <Pressable
      style={[styles.button, isPressed && styles.buttonPressed]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <View style={[styles.actionButton, isPressed && styles.viewPressed]}>
        <ChevronRightIcon color="white" />
      </View>
      <View style={styles.buttonTitle}>
        <Text style={styles.titleText}>
          {t(`products.${products[purchasePackage.product.identifier].i18n}`)}
        </Text>
      </View>
      <Text style={styles.buttonPrice}>
        {t('price', { val: purchasePackage.product.price })}
        {!!products[purchasePackage.product.identifier].period &&
          ` / ${t(
            `products.${products[purchasePackage.product.identifier].period}`,
          )}`}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    marginHorizontal: spacing['2xl'],
    marginBottom: spacing.lg,
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: colors.secondary[400],
    borderWidth: 1,
    overflow: 'hidden',
    padding: 4,
  },
  buttonPressed: {
    borderColor: colors.primary[500],
  },
  viewPressed: {
    backgroundColor: colors.primary[800],
  },
  buttonTitle: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  titleText: {},
  buttonDescription: {},
  buttonPrice: {
    paddingHorizontal: spacing['2xl'],
  },
  icon: {
    marginVertical: spacing.md,
    width: 50,
    height: 50,
  },
  actionButton: {
    backgroundColor: colors.primary[500],
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
