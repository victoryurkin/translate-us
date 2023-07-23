import React, { FC, useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@translate-us/i18n';
import { Input, Button } from '@translate-us/components';
import { useForm, Controller } from '@translate-us/hooks';
import { useAuth, AuthError, AuthErrorCodes } from '@translate-us/context';

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

  // const onSubmit = handleSubmit(async (data: unknown) => {
  //   console.log('=========', data);
  //   try {
  //     const formData = data as FormData;
  //     setLoading(true);
  //     await signIn(formData.email, formData.password);
  //     onSuccess();
  //   } catch (error) {
  //     const authError = error as AuthError;
  //     switch (authError.code) {
  //       case AuthErrorCodes.USER_NOT_FOUND:
  //       case AuthErrorCodes.WRONG_PASSWORD:
  //         setError(t('auth.errors.email_password_not_found'));
  //         break;
  //       default:
  //         setError(t('generic_error'));
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // });

  console.log('===========', errors);

  return (
    <React.Fragment>
      <View>
        <Text>{t('main.title')}</Text>
        <Text>{t('main.subtitle')}</Text>
      </View>

      <View>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} id="email" placeholder={t('auth.email')} />
          )}
        />
        {errors.email && <Text>{errors.email.message as string}</Text>}

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} id="password" placeholder={t('auth.password')} />
          )}
        />
        {errors.password && <Text>{errors.password.message as string}</Text>}

        {error && <Text>{error}</Text>}

        <Button title={t('auth.signin')} />
        <Button title={t('auth.forgot_password')} type="link" />
      </View>
    </React.Fragment>
  );
};
