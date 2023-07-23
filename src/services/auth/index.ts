import auth from '@react-native-firebase/auth';

export const signIn = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signUp = async (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return auth().signOut();
};

export const resetPassword = async (email: string) => {
  return auth().sendPasswordResetEmail(email);
};
