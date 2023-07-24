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
} from 'react-native';
import { colors, spacing, border, fontSize } from '@translate-us/styles';
import { supportedLanguages, Language } from '@translate-us/constants';
import { useTranslation } from '@translate-us/i18n';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { CheckIcon } from 'react-native-heroicons/outline';

const languages = Object.keys(supportedLanguages).map(
  key => supportedLanguages[key],
);

interface LanguageSelectorProps {
  language?: Language;
  onChange: (lang: Language) => void;
  type:
    | 'translate-source'
    | 'translate-target'
    | 'settings-source'
    | 'settings-target';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onChange,
  type,
}) => {
  const [query, setQuery] = React.useState<string>('');

  const { t } = useTranslation();

  const filteredLanguages = React.useMemo(() => {
    if (query.trim() !== '') {
      return languages.filter(lang => lang.name.includes(query));
    } else {
      return languages;
    }
  }, [query]);

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['25%', '50%'], []);
  const openLanguageSelector = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    if (index === 0) {
      bottomSheetModalRef.current?.close();
    }
    if (index === -1) {
      setQuery('');
    }
  }, []);

  const handleLanguageChange = React.useCallback(
    (lang: Language) => {
      bottomSheetModalRef.current?.close();
      onChange(lang);
    },
    [onChange],
  );

  return (
    <>
      {(type === 'translate-source' || type === 'translate-target') && (
        <View style={styles.languageContainer}>
          {type === 'translate-target' && (
            <Text style={styles.languageName}>{language?.name}</Text>
          )}
          <View style={styles.shadowContainer}>
            <Pressable
              style={styles.flagContainer}
              onPress={openLanguageSelector}>
              {language?.image && (
                <Image source={language.image} style={styles.flag} />
              )}
            </Pressable>
          </View>
          {type === 'translate-source' && (
            <Text style={styles.languageName}>{language?.name}</Text>
          )}
        </View>
      )}

      {(type === 'settings-source' || type === 'settings-target') && (
        <Pressable style={styles.settingsButton} onPress={openLanguageSelector}>
          <Text>{language?.name}</Text>
        </Pressable>
      )}

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
        ref={bottomSheetModalRef}
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
                    {lang.name}
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
});
