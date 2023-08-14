import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSize, spacing } from '@translate-us/styles';
import { Button } from './button';
import { Link } from './link';
import { PrivacyPolicy } from './privacy';
import { TermsOfUse } from './terms';

const screenDimensions = Dimensions.get('screen');

interface Props {
  isLoading: boolean;
  onSubscriptionPurchase: (productId: string) => void;
  onProductPurchase: (productId: string) => void;
}

export const Content: React.FC<Props> = ({
  isLoading,
  onSubscriptionPurchase,
  onProductPurchase,
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
            <Text style={styles.header}>Translate Us - Full Access</Text>
            <Text style={styles.subheader}>Start 3-Day Free Trial</Text>
          </LinearGradient>

          <View style={styles.buttonsContainer}>
            <View style={styles.topButtons}>
              <Button
                icon={require('../../../assets/images/sub-month.png')}
                title="$9.99/month"
                subtitle="3 days free, then"
                onPress={() => onSubscriptionPurchase('subMonth')}
              />
              <Button
                icon={require('../../../assets/images/sub-year.png')}
                title="$59.99/year"
                subtitle="3 days free, then"
                onPress={() => onSubscriptionPurchase('subYear')}
              />
            </View>
            <View style={styles.bottomButtons}>
              <Button
                icon={require('../../../assets/images/on-demand.png')}
                title="$0.99 for one day access"
                subtitle="pay as you need"
                onPress={() => onProductPurchase('prodDay')}
              />
            </View>
          </View>

          <View style={styles.linksContainer}>
            <Link
              title="Restore"
              size={fontSize.lg}
              color={colors.primary[600]}
              onPress={() => console.log('!!!')}
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
            <Text style={styles.description}>
              No recurring billing, if you purchase one day access.
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
      {isLoading && <View style={styles.loaderContainer} />}
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
    height: 160,
  },
  header: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subheader: {
    fontSize: fontSize.lg,
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
    paddingTop: spacing.mega,
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
    backgroundColor: colors.secondary[200],
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
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.secondary[200],
    opacity: 0.3,
  },
});
