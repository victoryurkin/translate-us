import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Language } from '@translate-us/constants';
import {
  supportedInterfaceLanguages,
  defaultInterfaceLanguage,
} from '@translate-us/i18n';
import { Button } from '@translate-us/components';
import { useAuth, useUser } from '@translate-us/context';
import { SettingsIcon } from './icon';
import {
  border,
  colors,
  fontSize,
  formFieldStyles,
  spacing,
} from '@translate-us/styles';
import { useTranslation, changeLanguage } from '@translate-us/i18n';
import { LanguageSelector } from '../components';

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { user, updateUser } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SettingsIcon width={180} height={180} fill={colors.primary[600]} />
      </View>
      <Text style={styles.header}>{t('settings.ui_language_title')}</Text>

      <View style={formFieldStyles}>
        <LanguageSelector
          languages={supportedInterfaceLanguages}
          language={
            user?.interfaceLanguage
              ? supportedInterfaceLanguages[user?.interfaceLanguage]
              : defaultInterfaceLanguage
          }
          onChange={(lang: Language) => {
            updateUser(draft => {
              draft.interfaceLanguage = lang.code;
            });
            changeLanguage(lang.code.substring(0, 2));
          }}
          type="settings-source"
        />
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
    fontSize: fontSize.h2,
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
  signout: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: spacing.mega,
  },
});
