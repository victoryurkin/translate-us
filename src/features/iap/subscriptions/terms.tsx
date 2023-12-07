import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { colors, fontSize, spacing } from '@translate-us/styles';
import { TermsOfUse as TermsOfUseComponent } from '@translate-us/components';
import { useTranslation } from '@translate-us/i18n';

interface Props {
  onBack: () => void;
}

export const TermsOfUse: React.FC<Props> = ({ onBack }) => {
  const [isPressed, setPressed] = React.useState(false);
  const { t } = useTranslation();

  return (
    <View>
      <LinearGradient
        colors={[colors.primary[700], colors.primary[500]]}
        style={styles.topBar}>
        <Pressable
          style={[
            styles.backButton,
            isPressed ? styles.backButtonPressed : styles.backButtonDefault,
          ]}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={onBack}>
          <ChevronLeftIcon color="white" />
        </Pressable>
        <Text style={styles.header}>{t('iap.terms')}</Text>
      </LinearGradient>

      <TermsOfUseComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing['2xl'],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    position: 'absolute',
    zIndex: 10,
  },
  backButtonDefault: {
    opacity: 1,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backIcon: {},
  header: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});
