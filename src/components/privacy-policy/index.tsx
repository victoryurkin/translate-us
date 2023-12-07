import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { spacing } from '@translate-us/styles';
import { useTranslation } from '@translate-us/i18n';

export const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.content}>
      <Text style={styles.strong}>{t('privacy.title_01')}</Text>
      <Text style={styles.paragraph}>{t('privacy.paragraph_01')}</Text>

      <Text style={styles.strong}>{t('privacy.title_02')}</Text>
      <Text style={styles.paragraph}>{t('privacy.paragraph_02')}</Text>

      <Text style={styles.strong}>{t('privacy.title_03')}</Text>
      <Text style={styles.paragraph}>{t('privacy.paragraph_03')}</Text>

      <Text style={styles.strong}>{t('privacy.title_04')}</Text>
      <Text style={styles.paragraph}>{t('privacy.paragraph_04')}</Text>

      <Text style={styles.paragraph}>{t('privacy.whiteof')}</Text>
      <View style={styles.bottom} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.mega,
  },
  strong: {
    fontWeight: 'bold',
  },
  paragraph: {
    marginVertical: spacing.sm,
  },
  bottom: {
    height: 80,
  },
});
