import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@translate-us/models';
import { supportedLanguages } from '@translate-us/constants';

enum AsyncStorageKeys {
  SOURCE_LANGUAGE = 'translateus.user.default.language.source',
  TARGET_LANGUAGE = 'translateus.user.default.language.target',
}

export const getUser = async (): Promise<User> => {
  const results = await Promise.all([
    AsyncStorage.getItem(AsyncStorageKeys.SOURCE_LANGUAGE),
    AsyncStorage.getItem(AsyncStorageKeys.TARGET_LANGUAGE),
  ]);

  return {
    defaultSourceLanguage: results[0] ? supportedLanguages[results[0]] : null,
    defaultTargetLanguage: results[1] ? supportedLanguages[results[1]] : null,
  } as User;
};

export const updateUser = async (user: User): Promise<User> => {
  const prmosies = [];
  if (user.defaultSourceLanguage) {
    prmosies.push(
      AsyncStorage.setItem(
        AsyncStorageKeys.SOURCE_LANGUAGE,
        user.defaultSourceLanguage.code,
      ),
    );
  }

  if (user.defaultTargetLanguage) {
    prmosies.push(
      AsyncStorage.setItem(
        AsyncStorageKeys.TARGET_LANGUAGE,
        user.defaultTargetLanguage.code,
      ),
    );
  }

  await Promise.all(prmosies);

  return user;
};
