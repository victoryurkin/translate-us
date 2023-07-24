import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from '@translate-us/i18n';
import { Input, Button } from '@translate-us/components';
import { useForm, Controller } from '@translate-us/hooks';
import { useAuth, AuthError, AuthErrorCodes } from '@translate-us/context';
import {
  spacing,
  fontSize,
  colors,
  container,
  formFieldStyles,
  textError,
} from '@translate-us/styles';

interface FormData {
  email: string;
  password: string;
  confirm_password: string;
}

export const Signup: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { t } = useTranslation();
  const { signUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm();

  const validate = (data: FormData): boolean => {
    if (data.password !== data.confirm_password) {
      setFormError('confirm_password', {
        type: 'manual',
        message: t('auth.passwords_dont_match'),
      });
      return false;
    }
    setError(undefined);
    return true;
  };

  const onSubmit = handleSubmit(async (data: unknown) => {
    try {
      const formData = data as FormData;
      const isValid = validate(formData);
      if (isValid) {
        setLoading(true);
        await signUp(formData.email, formData.password);
      }
    } catch (err) {
      const authError = err as AuthError;
      switch (authError.code) {
        case AuthErrorCodes.EMAIL_ALREADY_USED:
          setError(t('auth.errors.email_already_used'));
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
      <Text style={styles.header}>{t('main.title')}</Text>
      <Text style={styles.subheader}>{t('main.subtitle')}</Text>

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
          <Text style={styles.formError}>{errors.email.message as string}</Text>
        )}
      </View>

      <View style={formFieldStyles}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: t('auth.errors.password_required'),
            validate: {
              maxLength: v =>
                v.length <= 50 || t('auth.errors.password_max_length'),
              matchPattern: v =>
                /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}/.test(v) ||
                t('auth.errors.password_invalid'),
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              secureTextEntry={true}
              placeholder={t('auth.password')}
              editable={!isLoading}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.formError}>
            {errors.password.message as string}
          </Text>
        )}
      </View>

      <View style={formFieldStyles}>
        <Controller
          name="confirm_password"
          control={control}
          rules={{ required: t('auth.errors.confirm_password_required') }}
          render={({ field }) => (
            <Input
              {...field}
              id="confirm_password"
              secureTextEntry={true}
              placeholder={t('auth.confirm_password')}
              editable={!isLoading}
            />
          )}
        />
        {errors.confirm_password && (
          <Text style={styles.formError}>
            {errors.confirm_password.message as string}
          </Text>
        )}
      </View>

      {error && <Text style={styles.formErrorResponse}>{error}</Text>}

      <View style={formFieldStyles}>
        <Button
          title={t('auth.signup')}
          block={true}
          disabled={isLoading}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...container,
    paddingBottom: spacing.lg,
  },
  header: {
    marginTop: spacing['2xl'],
    textAlign: 'center',
    fontSize: fontSize.h1,
    color: colors.primary[700],
  },
  subheader: {
    marginBottom: spacing.md,
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
