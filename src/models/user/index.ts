import { Language } from '@translate-us/constants';

export interface User {
  uid: string;
  email: string;
  createdAt: {
    seconds: number;
  };
  defaultSourceLanguage?: Language;
  defaultTargetLanguage?: Language;
}
