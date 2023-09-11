import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PurchasesOfferings, PurchasesPackage } from 'react-native-purchases';
import { colors, fontSize, spacing } from '@translate-us/styles';
import { Button } from './button';
import { Link } from './link';
import { PrivacyPolicy } from './privacy';
import { TermsOfUse } from './terms';

const screenDimensions = Dimensions.get('screen');

interface Props {
  isLoading: boolean;
  offerings: PurchasesOfferings;
  onPurchase: (pcgk: PurchasesPackage) => Promise<void>;
  onRestore: () => Promise<void>;
}

export const Content: React.FC<Props> = ({
  isLoading,
  offerings,
  onPurchase,
  onRestore,
}) => {
  const [legalContent, setLegalContent] = React.useState<'privacy' | 'terms'>();
  const translateAnim = React.useRef(new Animated.Value(0)).current;
  const animationLeft = React.useMemo(
    () =>
      Animated.timing(translateAnim, {
        toValue: -screenDimensions.width,
        duration: 300,
        useNativeDriver: true,
      }),
    [translateAnim],
  );
  const animationRight = React.useMemo(
    () =>
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    [translateAnim],
  );

  return (
    <React.Fragment>
      <Animated.View
        style={[
          styles.mainContainer,
          { transform: [{ translateX: translateAnim }] },
        ]}>
        <View style={styles.container}>
          <LinearGradient
            colors={[colors.primary[700], colors.primary[500]]}
            style={styles.topBar}>
            <Text style={styles.header}>Translate Us</Text>
            <Text style={styles.subheader}>application full access</Text>
          </LinearGradient>

          <Text style={styles.subscriptionsTitle}>Start 3-Day Free Trial</Text>
          <Text style={styles.subscriptionsSubtitle}>
            with auto-renewable subscription plans
          </Text>
          <View style={styles.buttonsContainer}>
            {offerings.current?.availablePackages
              .filter(item => {
                const productObj = item.product as unknown;
                const product = productObj as { productType: string };
                return (
                  item.product.productCategory === 'SUBSCRIPTION' &&
                  product.productType !== 'PREPAID_SUBSCRIPTION'
                );
              })
              .map((item, index) => {
                return (
                  <Button
                    key={index}
                    purchasePackage={item}
                    onPress={() => onPurchase(item)}
                  />
                );
              })}
          </View>

          <Text style={styles.subscriptionsTitle}>or Pay as You Need</Text>
          <Text style={styles.subscriptionsSubtitle}>
            on-demand access (not auto-renewable)
          </Text>
          <View style={styles.buttonsContainer}>
            {offerings.current?.availablePackages
              .filter(item => {
                const productObj = item.product as unknown;
                const product = productObj as { productType: string };
                return (
                  item.product.productCategory !== 'SUBSCRIPTION' ||
                  product.productType === 'PREPAID_SUBSCRIPTION'
                );
              })
              .map((item, index) => {
                return (
                  <Button
                    key={index}
                    purchasePackage={item}
                    onPress={() => onPurchase(item)}
                  />
                );
              })}
          </View>

          <View style={styles.linksContainer}>
            <Link
              title="Restore"
              size={fontSize.md}
              color={colors.primary[600]}
              onPress={onRestore}
            />
            <View style={styles.bottomLinksContainer}>
              <Link
                title="Terms of Use"
                size={fontSize.md}
                color={colors.secondary[600]}
                onPress={() => {
                  setLegalContent('terms');
                  animationLeft.start();
                }}
              />
              <Link
                title="Privacy Policy"
                size={fontSize.md}
                color={colors.secondary[600]}
                onPress={() => {
                  setLegalContent('privacy');
                  animationLeft.start();
                }}
              />
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Monthly or yearly recurring billing, can be canceled anytime
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          {legalContent === 'privacy' && (
            <PrivacyPolicy
              onBack={() => {
                animationRight.start();
                setTimeout(() => {
                  setLegalContent(undefined);
                }, 300);
              }}
            />
          )}
          {legalContent === 'terms' && (
            <TermsOfUse
              onBack={() => {
                animationRight.start();
                setTimeout(() => {
                  setLegalContent(undefined);
                }, 300);
              }}
            />
          )}
        </View>
      </Animated.View>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.secondary[400]} />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: screenDimensions.width * 2,
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    width: screenDimensions.width,
  },

  topBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing['2xl'],
  },
  header: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subheader: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },

  buttonsContainer: {
    backgroundColor: 'white',
    position: 'relative',
    zIndex: 30,
  },
  topButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: -40,
    marginBottom: spacing['3xl'],
  },
  bottomButtons: {
    marginBottom: -40,
    paddingHorizontal: spacing['4xl'],
  },

  linksContainer: {
    paddingTop: spacing.xl,
  },

  subscriptionsTitle: {
    fontSize: fontSize.lg,
    marginHorizontal: spacing['2xl'],
    marginBottom: spacing.xs,
    marginTop: spacing.xl,
    textAlign: 'center',
    color: colors.primary[700],
  },
  subscriptionsSubtitle: {
    marginHorizontal: spacing['2xl'],
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },

  bottomLinksContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: spacing.mega,
    justifyContent: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary[300],
  },

  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: spacing['2xl'],
  },
  description: {
    flex: 1,
    color: colors.secondary[600],
    marginVertical: spacing.sm,
    marginHorizontal: spacing.sm,
    textAlign: 'center',
  },

  legalHeader: {
    borderBottomColor: colors.secondary[300],
  },

  loaderContainer: {
    position: 'absolute',
    zIndex: 50,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
