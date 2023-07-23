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
}

interface Props {
  onForgotPassword: () => void;
  onSuccess: () => void;
}

export const Signin: FC<Props> = ({ onForgotPassword, onSuccess }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { t } = useTranslation();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data: unknown) => {
    try {
      const formData = data as FormData;
      setLoading(true);
      await signIn(formData.email, formData.password);
      onSuccess();
    } catch (err) {
      const authError = err as AuthError;
      switch (authError.code) {
        case AuthErrorCodes.USER_NOT_FOUND:
        case AuthErrorCodes.WRONG_PASSWORD:
          setError(t('auth.errors.email_password_not_found'));
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
          rules={{ required: t('auth.errors.password_required') }}
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

      {error && <Text>{error}</Text>}

      <View style={formFieldStyles}>
        <Button
          title={t('auth.signin')}
          block={true}
          disabled={isLoading}
          onPress={onSubmit}
        />
      </View>

      <View style={formFieldStyles}>
        <Button
          title={t('auth.forgot_password')}
          type="link"
          onPress={onForgotPassword}
          block={true}
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
});
