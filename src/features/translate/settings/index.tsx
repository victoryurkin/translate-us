import React, { FC } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Link } from '@translate-us/components';
import { useAuth, useUser, useApp } from '@translate-us/context';
import { SettingsIcon } from './icon';
import {
  border,
  colors,
  fontSize,
  formFieldStyles,
  spacing,
} from '@translate-us/styles';
import { useTranslation } from '@translate-us/i18n';

interface SettingsProps {
  onPrivacy: () => void;
  onTerms: () => void;
}

export const Settings: FC<SettingsProps> = ({ onPrivacy, onTerms }) => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { deleteUser } = useUser();
  const { setLoading } = useApp();

  const deleteAccount = async () => {
    setLoading(true);
    try {
      await deleteUser();
      signOut();
    } catch (error) {
      console.error('Error deleting account: ', error);
      accountDeleteError();
    } finally {
      setLoading(false);
    }
  };

  const confirmAccountDelete = () =>
    Alert.alert(
      t('settings.close_account_confirm_dialog.title'),
      t('settings.close_account_confirm_dialog.description'),
      [
        {
          text: t('settings.close_account_confirm_dialog.cancel'),
          style: 'cancel',
        },
        {
          text: t('settings.close_account_confirm_dialog.delete'),
          onPress: deleteAccount,
        },
      ],
    );

  const accountDeleteError = () =>
    Alert.alert(
      t('settings.close_account_confirm_dialog.error_title'),
      t('settings.close_account_confirm_dialog.error_description'),
      [
        {
          text: t('settings.close_account_confirm_dialog.close'),
          style: 'cancel',
        },
      ],
    );

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SettingsIcon width={180} height={180} fill={colors.primary[600]} />
      </View>

      <View style={formFieldStyles}>
        <Text style={styles.header}>{t('settings.account_management')}</Text>
        <Button
          title={t('settings.close_account')}
          type="default"
          block
          styles={styles.closeButton}
          onPress={confirmAccountDelete}
        />

        <View style={styles.linksContainer}>
          <Link
            title={t('privacy_policy.title')}
            size={fontSize.sm}
            color={colors.primary[600]}
            onPress={onPrivacy}
          />
          <Link
            title={t('terms_of_use.title')}
            size={fontSize.sm}
            color={colors.primary[600]}
            onPress={onTerms}
          />
        </View>
      </View>

      <View style={styles.signout}>
        <Button title={t('auth.signout')} type="default" onPress={signOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.mega,
    paddingHorizontal: spacing.xl,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  header: {
    fontSize: fontSize.lg,
    color: colors.primary[600],
    marginTop: spacing['4xl'],
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: fontSize.md,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  select: {
    width: '100%',
    borderRadius: border.radius,
    paddingHorizontal: spacing.xl,
  },
  dropdown: {
    borderRadius: 20,
  },
  row: {
    paddingHorizontal: spacing.lg,
  },
  selectedRow: {
    paddingHorizontal: spacing.lg,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedRowText: {
    flex: 1,
    color: colors.primary['700'],
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.secondary[300],
    marginTop: spacing['4xl'],
  },
  closeButton: {
    paddingVertical: spacing.md,
  },
  signout: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: spacing.mega,
  },
});
