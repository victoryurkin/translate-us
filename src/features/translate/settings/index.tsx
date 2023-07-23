import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { CheckIcon } from 'react-native-heroicons/outline';
import { supportedLanguages, Language } from '@translate-us/constants';
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
import { useTranslation } from '@translate-us/i18n';

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { user, updateUser } = useUser();

  const data = Object.keys(supportedLanguages).map(
    key => supportedLanguages[key],
  );
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SettingsIcon width={180} height={180} fill={colors.primary[600]} />
      </View>
      <Text style={styles.header}>{t('settings.default_languages')}</Text>

      <View style={formFieldStyles}>
        <Text style={styles.label}>{t('settings.default_source')}</Text>
        <SelectDropdown
          buttonStyle={styles.select}
          dropdownStyle={styles.dropdown}
          data={data}
          defaultValue={
            user && user.defaultSourceLanguage
              ? user.defaultSourceLanguage
              : undefined
          }
          renderCustomizedRowChild={item => {
            if (user?.defaultSourceLanguage?.code === item.code) {
              return (
                <View style={styles.selectedRow}>
                  <Text style={styles.selectedRowText}>{item.name}</Text>
                  <CheckIcon />
                </View>
              );
            }
            return <Text style={styles.row}>{item.name}</Text>;
          }}
          renderCustomizedButtonChild={selectedItem => (
            <Text>{selectedItem?.name}</Text>
          )}
          onSelect={(selectedItem: Language) => {
            updateUser(draft => {
              draft.defaultSourceLanguage = selectedItem;
            });
          }}
          search
          buttonTextAfterSelection={selectedItem => {
            return selectedItem;
          }}
          rowTextForSelection={item => {
            return item;
          }}
        />
      </View>

      <View style={formFieldStyles}>
        <Text style={styles.label}>{t('settings.default_source')}</Text>
        <SelectDropdown
          buttonStyle={styles.select}
          dropdownStyle={styles.dropdown}
          data={data}
          defaultValue={
            user && user.defaultTargetLanguage
              ? user.defaultTargetLanguage
              : undefined
          }
          renderCustomizedRowChild={item => {
            if (user?.defaultTargetLanguage?.code === item.code) {
              return (
                <View style={styles.selectedRow}>
                  <Text style={styles.selectedRowText}>{item.name}</Text>
                  <CheckIcon />
                </View>
              );
            }
            return <Text style={styles.row}>{item.name}</Text>;
          }}
          renderCustomizedButtonChild={selectedItem => (
            <Text>{selectedItem?.name}</Text>
          )}
          onSelect={(selectedItem: Language) => {
            updateUser(draft => {
              draft.defaultTargetLanguage = selectedItem;
            });
          }}
          search
          buttonTextAfterSelection={selectedItem => {
            return selectedItem;
          }}
          rowTextForSelection={item => {
            return item;
          }}
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
