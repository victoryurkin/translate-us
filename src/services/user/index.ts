import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@translate-us/models';
import { supportedLanguages } from '@translate-us/constants';
import firestore from '@react-native-firebase/firestore';

enum AsyncStorageKeys {
  SOURCE_LANGUAGE = 'translateus.user.default.language.source',
  TARGET_LANGUAGE = 'translateus.user.default.language.target',
}

export const getUser = async (uid: string): Promise<User> => {
  const response = await firestore().collection('Users').doc(uid).get();
  return { uid: response.id, ...response.data() } as User;
};

export const updateUser = async (user: User): Promise<User> => {
  // const prmosies = [];
  // if (user.defaultSourceLanguage) {
  //   prmosies.push(
  //     AsyncStorage.setItem(
  //       AsyncStorageKeys.SOURCE_LANGUAGE,
  //       user.defaultSourceLanguage.code,
  //     ),
  //   );
  // }

  // if (user.defaultTargetLanguage) {
  //   prmosies.push(
  //     AsyncStorage.setItem(
  //       AsyncStorageKeys.TARGET_LANGUAGE,
  //       user.defaultTargetLanguage.code,
  //     ),
  //   );
  // }

  // await Promise.all(prmosies);

  return user;
};
