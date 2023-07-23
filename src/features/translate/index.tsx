import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Layout } from '@translate-us/components';
import { colors, spacing } from '@translate-us/styles';
import { ButtonTranslate, ButtonSettings } from './components';
import { Settings } from './settings';

export const Translate: React.FC = () => {
  const [isSettingsOpen, toggleSettings] = React.useState(false);
  return (
    <>
      <Drawer
        drawerPosition="right"
        open={isSettingsOpen}
        onOpen={() => toggleSettings(true)}
        onClose={() => toggleSettings(false)}
        renderDrawerContent={() => {
          return <Settings />;
        }}>
        <Layout>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <ButtonSettings onPress={() => toggleSettings(!isSettingsOpen)} />
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
      </Drawer>
    </>
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
