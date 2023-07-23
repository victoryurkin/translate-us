import { Language } from '@translate-us/constants';

export interface User {
  defaultSourceLanguage?: Language;
  defaultTargetLanguage?: Language;
}
