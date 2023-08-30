/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Drawer } from 'react-native-drawer-layout';
import { Layout } from '@translate-us/components';
import { useUser } from '@translate-us/context';
import { border, colors, fontSize, spacing } from '@translate-us/styles';
import {
  ButtonTranslate,
  ButtonSettings,
  LanguageSelector,
} from './components';
import { Settings } from './settings';
import { Language, supportedLanguages } from '@translate-us/constants';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useStream } from './stream';

export const Translate: React.FC = () => {
  const { user, updateUser } = useUser();
  const {
    connect,
    disconnect,
    startRecording,
    stopRecording,
    waitServerResponse,
    job,
  } = useStream();

  const [sourceLanguage, setSourceLanguage] = React.useState<Language>();
  const [targetLanguage, setTargetLanguage] = React.useState<Language>();
  const [isSettingsOpen, toggleSettings] = React.useState(false);

  React.useEffect(() => {
    if (user!.defaultSourceLanguage) {
      setSourceLanguage(supportedLanguages[user!.defaultSourceLanguage]);
    } else {
      setSourceLanguage(supportedLanguages['en-US']);
    }
    if (user!.defaultTargetLanguage) {
      setTargetLanguage(supportedLanguages[user!.defaultTargetLanguage]);
    } else {
      setTargetLanguage(supportedLanguages['es-US']);
    }
  }, [user!.defaultSourceLanguage, user!.defaultTargetLanguage]);

  React.useEffect(() => {
    const loadConnection = async () => {
      await waitServerResponse();
      connect();
    };
    loadConnection();
    return disconnect();
  }, []);

  React.useEffect(() => {
    if (sourceLanguage) {
      updateUser(draft => {
        draft.defaultSourceLanguage = sourceLanguage.code;
      });
    }
  }, [sourceLanguage]);

  React.useEffect(() => {
    if (targetLanguage) {
      updateUser(draft => {
        draft.defaultTargetLanguage = targetLanguage.code;
      });
    }
  }, [targetLanguage]);

  return (
    <Drawer
      drawerPosition="right"
      open={isSettingsOpen}
      onOpen={() => toggleSettings(true)}
      onClose={() => toggleSettings(false)}
      renderDrawerContent={() => {
        return (
          <BottomSheetModalProvider>
            <Settings />
          </BottomSheetModalProvider>
        );
      }}>
      <BottomSheetModalProvider>
        <Layout>
          <View style={styles.container}>
            <LinearGradient
              colors={[colors.primary[600], colors.primary[700]]}
              style={styles.topBar}>
              <ButtonSettings onPress={() => toggleSettings(!isSettingsOpen)} />
            </LinearGradient>
            <View style={styles.absoluteContainer}>
              <LanguageSelector
                language={sourceLanguage}
                onChange={(lang: Language) => setSourceLanguage(lang)}
                type="translate-source"
              />
            </View>
            <View style={styles.contentTopContainer}>
              <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.translationText}>
                  {job?.sourceCode === sourceLanguage?.code &&
                    job?.transcription}
                  {job?.targetCode === sourceLanguage?.code && (
                    <>
                      {(job?.isTranslationRunning ||
                        job?.isWaitingTranscriptionEndSignal) &&
                        'Loading...'}
                      {job?.translation}
                    </>
                  )}
                </Text>
              </ScrollView>
            </View>
            <View style={styles.absoluteContainer}>
              <ButtonTranslate
                onStartUpRecording={() =>
                  sourceLanguage &&
                  targetLanguage &&
                  startRecording(sourceLanguage.code, targetLanguage.code)
                }
                onStartDownRecording={() =>
                  sourceLanguage &&
                  targetLanguage &&
                  startRecording(targetLanguage.code, sourceLanguage.code)
                }
                onStopRecording={stopRecording}
                isLoading={
                  job?.isTranslationRunning ||
                  job?.isWaitingTranscriptionEndSignal
                }
              />
            </View>
            <View style={styles.contentBottomContainer}>
              <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.translationText}>
                  {job?.sourceCode === targetLanguage?.code &&
                    job?.transcription}
                  {job?.targetCode === targetLanguage?.code && (
                    <>
                      {(job?.isTranslationRunning ||
                        job?.isWaitingTranscriptionEndSignal) &&
                        'Loading...'}
                      {job?.translation}
                    </>
                  )}
                </Text>
              </ScrollView>
            </View>
            <View style={styles.absoluteContainer}>
              <LanguageSelector
                language={targetLanguage}
                onChange={(lang: Language) => setTargetLanguage(lang)}
                type="translate-target"
              />
            </View>
            <LinearGradient
              colors={[colors.primary[700], colors.primary[600]]}
              style={styles.bottomBar}
            />
          </View>
        </Layout>
      </BottomSheetModalProvider>
    </Drawer>
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
    paddingBottom: spacing.sm,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    zIndex: 10,
    height: 60,
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
  translationText: {
    paddingHorizontal: spacing['2xl'],
    textAlign: 'center',
    fontSize: fontSize.md,
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
    paddingVertical: spacing['3xl'],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 60,
  },
  bottomSheetModal: {
    backgroundColor: colors.secondary[800],
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -5,
    },
  },
});
