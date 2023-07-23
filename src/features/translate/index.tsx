import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Layout } from '@translate-us/components';
import { colors, spacing } from '@translate-us/styles';
import { ButtonTranslate, ButtonSettings } from './components';

export const Translate: React.FC = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <ButtonSettings />
        </View>
        <View style={styles.contentTopContainer}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text />
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonTranslate />
        </View>
        <View style={styles.contentBottomContainer}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text />
          </ScrollView>
        </View>
        <View style={styles.bottomBar} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    backgroundColor: colors.primary[600],
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    zIndex: 10,
  },
  contentTopContainer: {
    flex: 1,
    marginTop: -30,
  },
  contentBottomContainer: {
    flex: 1,
    marginBottom: -30,
  },
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    backgroundColor: colors.primary[600],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
