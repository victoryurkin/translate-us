/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
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

export interface LanguageSelectorProps {
  languages?: SupportedLanguages | i18nSupportedLanguages;
  selectedLanguage?: Language;
  onSelect?: (lang: Language) => void;
}

/*** Provider ***/

export interface LanguageSelectorState extends LanguageSelectorProps {
  isOpen: boolean;
  close: () => void;
  toggleLanguageSelector: (props: LanguageSelectorProps) => void;
}

const initialState: LanguageSelectorState = {
  isOpen: false,
  close: () => {
    console.warn('No LanguageSelector provider found');
  },
  toggleLanguageSelector: () => {
    console.warn('No LanguageSelector provider found');
  },
};

const LanguageSelectorContext = React.createContext(initialState);

enum DispatchTypes {
  SET_OPEN,
  SET_PROPS,
}

interface DispatchProps {
  type: DispatchTypes;
  payload?: unknown;
}

const reducer = (
  state: LanguageSelectorState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case DispatchTypes.SET_OPEN:
      return {
        ...state,
        isOpen: payload as boolean,
      };
    case DispatchTypes.SET_PROPS:
      const props = payload as LanguageSelectorProps;
      return {
        ...state,
        ...props,
      };
    default:
      return state;
  }
};

export const LanguageSelectorProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [languageSelectorState, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  const providerValue = React.useMemo(() => {
    const toggleLanguageSelector = (props: LanguageSelectorProps) => {
      dispatch({ type: DispatchTypes.SET_PROPS, payload: props });
      dispatch({ type: DispatchTypes.SET_OPEN, payload: true });
    };
    const close = () => {
      dispatch({ type: DispatchTypes.SET_OPEN, payload: false });
    };
    return {
      ...languageSelectorState,
      toggleLanguageSelector,
      close,
    };
  }, [languageSelectorState]);

  return (
    <LanguageSelectorContext.Provider value={providerValue}>
      {children}
    </LanguageSelectorContext.Provider>
  );
};

export const useLanguageSelector = () =>
  React.useContext(LanguageSelectorContext);

const options = {
  includeScore: true,
  threshold: 0.1,
  keys: ['name', 'code'],
};

export const LanguageSelectorModal: React.FC = () => {
  const { isOpen, languages, selectedLanguage, onSelect, close } =
    useLanguageSelector();

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

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(
    () => (isKeyboardVisible ? ['25%', '75%'] : ['25%', '50%']),
    [isKeyboardVisible],
  );

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [isOpen]);

  const handleSheetChanges = React.useCallback(
    (index: number) => {
      if (index === 0) {
        bottomSheetModalRef.current?.close();
        close();
      }
      if (index === -1) {
        setQuery('');
      }
    },
    [close],
  );

  const handleLanguageChange = React.useCallback(
    (lang: Language) => {
      bottomSheetModalRef.current?.close();
      onSelect && onSelect(lang);
      close();
    },
    [onSelect, close],
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
      onDismiss={() => close()}
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
                    selectedLanguage?.code === lang.code
                      ? styles.rowTextSelected
                      : styles.rowText
                  }>
                  {t(`lang.${lang.code}`)}
                </Text>
                {selectedLanguage?.code === lang.code && (
                  <CheckIcon width={16} height={16} />
                )}
              </Pressable>
            );
          })}
          <View style={styles.row} />
        </ScrollView>
      </View>
    </BottomSheetModal>
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
  keyboardAvoidingViewContainer: {},
});
