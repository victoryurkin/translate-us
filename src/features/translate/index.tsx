/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Layout } from '@translate-us/components';
import { useUser } from '@translate-us/context';
import { border, colors, fontSize, spacing } from '@translate-us/styles';
import { ButtonTranslate, ButtonSettings } from './components';
import { Settings } from './settings';
import { Language, supportedLanguages } from '@translate-us/constants';

export const Translate: React.FC = () => {
  const { isLoading, user } = useUser();

  const [sourceLanguage, setSourceLanguage] = React.useState<Language>();
  const [targetLanguage, setTargetLanguage] = React.useState<Language>();
  const [isSettingsOpen, toggleSettings] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) {
      if (user?.defaultSourceLanguage) {
        setSourceLanguage(user.defaultSourceLanguage);
      } else {
        setSourceLanguage(supportedLanguages['en-US']);
      }
      if (user?.defaultTargetLanguage) {
        setTargetLanguage(user.defaultTargetLanguage);
      } else {
        setTargetLanguage(supportedLanguages['es-US']);
      }
    }
  }, [isLoading]);

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
            <View style={styles.absoluteContainer}>
              <View style={styles.languageContainer}>
                <View style={styles.shadowContainer}>
                  <View style={styles.flagContainer}>
                    {sourceLanguage?.image && (
                      <Image
                        source={sourceLanguage.image}
                        style={styles.flag}
                      />
                    )}
                  </View>
                </View>
                <Text style={styles.languageName}>{sourceLanguage?.name}</Text>
              </View>
            </View>
            <View style={styles.contentTopContainer}>
              <ScrollView contentContainerStyle={styles.content}>
                <Text />
              </ScrollView>
            </View>
            <View style={styles.absoluteContainer}>
              <ButtonTranslate />
            </View>
            <View style={styles.contentBottomContainer}>
              <ScrollView contentContainerStyle={styles.content}>
                <Text />
              </ScrollView>
            </View>
            <View style={styles.absoluteContainer}>
              <View style={styles.languageContainer}>
                <Text style={styles.languageName}>{targetLanguage?.name}</Text>
                <View style={styles.shadowContainer}>
                  <View style={styles.flagContainer}>
                    {targetLanguage?.image && (
                      <Image
                        source={targetLanguage.image}
                        style={styles.flag}
                      />
                    )}
                  </View>
                </View>
              </View>
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
    height: 90,
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
  absoluteContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  languageContainer: {
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    width: 80,
    height: 80,
    borderRadius: border.radius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#000000',
  },
  flagContainer: {
    width: 80,
    height: 80,
    borderRadius: border.radius,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    width: 114,
    height: 80,
    resizeMode: 'stretch',
  },
  languageName: {
    fontSize: fontSize.md,
    color: colors.secondary[500],
    marginVertical: spacing.sm,
  },
  bottomBar: {
    backgroundColor: colors.primary[600],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 90,
  },
});
