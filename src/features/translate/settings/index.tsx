import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { supportedLanguages } from '@translate-us/constants';
import { Button } from '@translate-us/components';
import { useAuth } from '@translate-us/context';
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

  const data = Object.keys(supportedLanguages).map(key => ({
    key,
    value: supportedLanguages[key].name,
  }));
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
          data={data}
          renderCustomizedRowChild={item => <Text>{item.value}</Text>}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
          data={data}
          renderCustomizedRowChild={item => <Text>{item.value}</Text>}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
  },
  select: {
    width: '100%',
    borderRadius: border.radius,
    // borderWidth: 1,
    // backgroundColor: 'white',
  },
  signout: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: spacing.mega,
  },
});
