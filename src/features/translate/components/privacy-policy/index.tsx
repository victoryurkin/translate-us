import React, { FC } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { XMarkIcon } from 'react-native-heroicons/solid';
import {
  Modal,
  PrivacyPolicy as PrivacyPolicyComponent,
} from '@translate-us/components';
import { colors, fontSize, spacing } from '@translate-us/styles';
import { useTranslation } from '@translate-us/i18n';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  const [isPressed, setPressed] = React.useState(false);

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen}>
      <LinearGradient
        colors={[colors.primary[700], colors.primary[500]]}
        style={styles.topBar}>
        <Text style={styles.header}>{t('privacy_policy.title')}</Text>
        <Pressable
          style={[
            styles.closeButton,
            isPressed ? styles.backButtonPressed : styles.backButtonDefault,
          ]}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={onClose}>
          <XMarkIcon color="white" />
        </Pressable>
      </LinearGradient>

      <PrivacyPolicyComponent />
    </Modal>
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
  closeButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    position: 'absolute',
    zIndex: 10,
    right: 0,
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
