import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  LanguageIcon,
  PlayIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
} from 'react-native-heroicons/outline';
import { ListMenu } from '@translate-us/components';
import { SettingsIcon } from './icon';
import {
  border,
  colors,
  fontSize,
  formFieldStyles,
  spacing,
} from '@translate-us/styles';
import { Language } from '@translate-us/constants';
import {
  useTranslation,
  supportedInterfaceLanguages,
  getDefaultLanguageObject,
  defaultInterfaceLanguage,
  changeLanguage,
} from '@translate-us/i18n';
import { useNavigation } from '@translate-us/hooks';
import { useLanguageSelector } from '@translate-us/components';
import { notifications, AppEvents } from '@translate-us/clients';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: FC<SettingsProps> = ({ onClose }) => {
  const [uiLanguage, setUiLanguage] = React.useState<Language>(
    defaultInterfaceLanguage,
  );

  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { toggleLanguageSelector } = useLanguageSelector();

  React.useEffect(() => {
    const lang = getDefaultLanguageObject();
    setUiLanguage(lang);
  }, []);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.icon}>
          <SettingsIcon width={180} height={180} fill={colors.secondary[400]} />
        </View>

        <View style={{ ...formFieldStyles, ...styles.menu }}>
          <ListMenu
            sectionTitle={t('settings.ui_language_title')}
            icon={LanguageIcon}
            title={t(`lang.${uiLanguage?.code}`)}
            onPress={() =>
              toggleLanguageSelector({
                languages: supportedInterfaceLanguages,
                onSelect: lang => {
                  setUiLanguage(lang);
                  changeLanguage(lang.code);
                },
              })
            }
          />

          <ListMenu
            sectionTitle={t('learn.how_to_use')}
            icon={PlayIcon}
            title={t('settings.watch_now')}
            onPress={() => {
              onClose();
              notifications.emit(AppEvents.LEARN_PLAY);
            }}
          />

          <ListMenu
            sectionTitle={t('settings.terms_privacy')}
            icon={DocumentCheckIcon}
            title={t('terms_of_use.title')}
            onPress={() => {
              onClose();
              navigate('TermsOfUse');
            }}
          />
          <ListMenu
            icon={ShieldCheckIcon}
            title={t('privacy_policy.title')}
            onPress={() => {
              onClose();
              navigate('PrivacyPolicy');
            }}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary[800],
    paddingTop: spacing.mega,
    paddingHorizontal: spacing.xl,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  menu: {
    flex: 1,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing['4xl'],
  },
  header: {
    fontSize: fontSize.lg,
    color: colors.primary[600],
    marginTop: spacing['4xl'],
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: fontSize.md,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineIcon: {
    marginRight: spacing.md,
  },
  lineText: {
    color: colors.secondary[200],
  },
  select: {
    width: '100%',
    borderRadius: border.radius,
    paddingHorizontal: spacing.xl,
  },
  dropdown: {
    borderRadius: 20,
  },
  row: {
    paddingHorizontal: spacing.lg,
  },
  selectedRow: {
    paddingHorizontal: spacing.lg,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedRowText: {
    flex: 1,
    color: colors.primary['700'],
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.secondary[500],
    paddingBottom: spacing.mega,
  },
  closeButton: {
    paddingVertical: spacing.md,
  },
  signout: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: spacing.mega,
  },
});
