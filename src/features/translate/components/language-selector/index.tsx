/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
} from 'react-native';
import Fuse from 'fuse.js';
import { colors, spacing, border, fontSize } from '@translate-us/styles';
import {
  supportedLanguages,
  Language,
  SupportedLanguages,
} from '@translate-us/constants';
import {
  useTranslation,
  SupportedLanguages as i18nSupportedLanguages,
} from '@translate-us/i18n';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { CheckIcon } from 'react-native-heroicons/outline';

const options = {
  includeScore: true,
  threshold: 0.1,
  keys: ['name', 'code'],
};

interface LanguageSelectorButtonProps {
  language: Language;
  onPress: () => void;
  type: 'translate-source' | 'translate-target';
}

export const LanguageSelectorButton: React.FC<LanguageSelectorButtonProps> = ({
  language,
  type,
  onPress,
}) => {
  const [isPressed, setPressed] = React.useState(false);
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.languageContainer}>
        {type === 'translate-target' && (
          <Text style={styles.languageName}>{t(`lang.${language?.code}`)}</Text>
        )}
        <View style={styles.shadowContainer}>
          <Pressable
            style={{ ...styles.flagContainer }}
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}>
            {language?.image && (
              <Image
                source={language.image}
                style={isPressed ? styles.flagPressed : styles.flag}
              />
            )}
          </Pressable>
        </View>
        {type === 'translate-source' && (
          <Text style={styles.languageName}>{t(`lang.${language?.code}`)}</Text>
        )}
      </View>
    </>
  );
};

interface LanguageSelectorProps {
  modalRef: React.RefObject<BottomSheetModal>;
  languages?: SupportedLanguages | i18nSupportedLanguages;
  language?: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  modalRef,
  languages,
  language,
  onChange,
}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);

  const { t } = useTranslation();

  const langs = React.useMemo(() => {
    return languages
      ? Object.keys(languages).map(key => ({
          name: t(`lang.${languages[key].code}`),
          code: languages[key].code,
        }))
      : Object.keys(supportedLanguages).map(key => ({
          name: t(`lang.${supportedLanguages[key].code}`),
          code: supportedLanguages[key].code,
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages, supportedLanguages]);

  const [query, setQuery] = React.useState<string>('');

  const filteredLanguages = React.useMemo(() => {
    if (query.trim() !== '') {
      const fuse = new Fuse(langs, options);
      const result = fuse.search(query);
      return result.map(item => item.item);
    } else {
      return langs;
    }
  }, [query, langs]);

  const snapPoints = React.useMemo(
    () => (isKeyboardVisible ? ['25%', '75%'] : ['25%', '50%']),
    [isKeyboardVisible],
  );

  const handleSheetChanges = React.useCallback(
    (index: number) => {
      if (index === 0) {
        modalRef.current?.close();
      }
      if (index === -1) {
        setQuery('');
      }
    },
    [modalRef],
  );

  const handleLanguageChange = React.useCallback(
    (lang: Language) => {
      modalRef.current?.close();
      onChange(lang);
    },
    [onChange, modalRef],
  );

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <BottomSheetModal
        backdropComponent={backdropProps => (
          <BottomSheetBackdrop
            {...backdropProps}
            enableTouchThrough={true}
            opacity={0.3}
          />
        )}
        handleStyle={styles.handleStyle}
        backgroundStyle={styles.bottomSheetModal}
        ref={modalRef}
        index={1}
        snapPoints={snapPoints}
        enableDismissOnClose
        onChange={handleSheetChanges}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={text => setQuery(text)}
            placeholder={t('translate.search')}
            onFocus={() => setIsKeyboardVisible(true)}
            onBlur={() => setIsKeyboardVisible(false)}
          />
          <ScrollView>
            {filteredLanguages.map(lang => {
              return (
                <Pressable
                  key={lang.code}
                  style={styles.row}
                  onPress={() => handleLanguageChange(lang)}>
                  <Text
                    style={
                      language?.code === lang.code
                        ? styles.rowTextSelected
                        : styles.rowText
                    }>
                    {t(`lang.${lang.code}`)}
                  </Text>
                  {language?.code === lang.code && (
                    <CheckIcon width={16} height={16} />
                  )}
                </Pressable>
              );
            })}
            <View style={styles.row} />
          </ScrollView>
        </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
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
  flagPressed: {
    width: 114,
    height: 80,
    resizeMode: 'stretch',
    opacity: 0.7,
  },
  languageName: {
    fontSize: fontSize.md,
    color: colors.secondary[500],
    marginVertical: spacing.sm,
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
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    flex: 1,
  },
  row: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    color: colors.secondary[300],
    flex: 1,
  },
  rowTextSelected: {
    color: colors.primary[300],
    flex: 1,
  },
  input: {
    backgroundColor: colors.secondary[700],
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    color: colors.secondary[200],
  },
  settingsButton: {
    backgroundColor: colors.secondary[200],
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: border.radius,
  },
  handleStyle: {
    paddingVertical: 16,
  },
  keyboardAvoidingViewContainer: {},
});
