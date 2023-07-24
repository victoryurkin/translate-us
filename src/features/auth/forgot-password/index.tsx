import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from '@translate-us/i18n';
import { Input, Button } from '@translate-us/components';
import { useForm, Controller } from '@translate-us/hooks';
import { KeyIcon } from 'react-native-heroicons/solid';
import { useAuth, AuthError, AuthErrorCodes } from '@translate-us/context';
import {
  spacing,
  container,
  formFieldStyles,
  textError,
  fontSize,
  colors,
} from '@translate-us/styles';

interface FormData {
  email: string;
}

interface Props {
  onSuccess: () => void;
}

export const ForgotPassword: FC<Props> = ({ onSuccess }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [isSubmitted, setSubmitted] = React.useState(false);

  const { t } = useTranslation();
  const { resetPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data: unknown) => {
    try {
      const formData = data as FormData;
      setLoading(true);
      await resetPassword(formData.email);
      setSubmitted(true);
    } catch (err) {
      const authError = err as AuthError;
      switch (authError.code) {
        case AuthErrorCodes.USER_NOT_FOUND:
          setError(t('auth.errors.email_not_found'));
          break;
        default:
          setError(t('generic_error'));
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <KeyIcon width={80} height={80} />
      </View>

      {!isSubmitted && (
        <>
          <View style={formFieldStyles}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: t('auth.errors.email_required'),
                validate: {
                  maxLength: v =>
                    v.length <= 50 || t('auth.errors.email_max_length'),
                  matchPattern: v =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    t('auth.errors.email_invalid'),
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  placeholder={t('auth.email')}
                  editable={!isLoading}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.formError}>
                {errors.email.message as string}
              </Text>
            )}
          </View>

          {error && <Text style={styles.formErrorResponse}>{error}</Text>}

          <View style={formFieldStyles}>
            <Button
              title={t('auth.reset')}
              block={true}
              disabled={isLoading}
              onPress={onSubmit}
            />
          </View>
        </>
      )}

      {isSubmitted && (
        <>
          <Text style={styles.header}>{t('auth.reset_success_title')}</Text>
          <Text style={styles.subheader}>
            {t('auth.reset_success_subtitle')}
          </Text>
          <View style={formFieldStyles}>
            <Button
              title={t('auth.signin')}
              block={true}
              disabled={isLoading}
              onPress={onSuccess}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...container,
    paddingBottom: spacing.lg,
  },
  icon: {
    marginVertical: spacing['4xl'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: fontSize.h1,
    color: colors.primary[700],
  },
  subheader: {
    marginBottom: spacing['4xl'],
    textAlign: 'center',
    fontSize: fontSize.lg,
    color: colors.primary[700],
  },
  formError: {
    ...textError,
    paddingHorizontal: spacing.xl,
  },
  formErrorResponse: {
    ...textError,
    paddingHorizontal: spacing.xl,
    marginVertical: spacing.lg,
  },
});
