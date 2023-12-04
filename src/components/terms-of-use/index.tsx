import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '@translate-us/styles';
import { useTranslation } from '@translate-us/i18n';

export const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.content}>
      <Text style={styles.paragraph}>{t('terms.paragraph_01')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_02')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_03')}</Text>
      <Text style={styles.strong}>{t('terms.title_02')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_07')}</Text>
      <Text style={styles.strong}>{t('terms.title_03')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_08')}</Text>
      <Text style={styles.strong}>{t('terms.title_04')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_09')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_10')}</Text>
      <Text style={styles.strong}>{t('terms.title_05')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_11')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_12')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_13')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_14')}</Text>
      <Text style={styles.strong}>{t('terms.title_06')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_15')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_16')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_17')}</Text>
      <Text style={styles.strong}>{t('terms.title_07')}</Text>
      <Text style={styles.paragraph}>{t('terms.paragraph_18')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing['2xl'],
    paddingBottom: spacing.mega,
  },
  strong: {
    fontWeight: 'bold',
  },
  paragraph: {
    marginVertical: spacing.sm,
  },
});
