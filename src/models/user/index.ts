export interface User {
  uid: string;
  email: string;
  createdAt: {
    seconds: number;
  };
  interfaceLanguage?: string;
  defaultSourceLanguage?: string;
  defaultTargetLanguage?: string;
}
