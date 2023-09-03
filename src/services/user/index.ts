import firestore from '@react-native-firebase/firestore';
import { User } from '@translate-us/models';

export const getUser = async (uid: string): Promise<User> => {
  const response = await firestore().collection('Users').doc(uid).get();
  return { uid: response.id, ...response.data() } as User;
};

export const updateUser = async (user: User): Promise<void> => {
  await firestore().collection('Users').doc(user.uid).update(user);
};

export const createUser = async (uid: string, email: string): Promise<void> => {
  const created = firestore.Timestamp.now();
  await firestore().collection('Users').doc(uid).set({ uid, email, created });
};

export const deleteUser = async (uid: string): Promise<void> => {
  await firestore().collection('Users').doc(uid).delete();
};
