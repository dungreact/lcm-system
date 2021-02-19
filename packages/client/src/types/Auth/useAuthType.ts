import firebase from 'firebase/app';

export interface IUseAuthType {
  loading: boolean;
  user: firebase.User | null;
  signIn: (email: string, password: string) => Promise<firebase.User | null>;
  signUp: (email: string, password: string) => Promise<firebase.User | null>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  confirmPasswordReset: (code: string, password: string) => Promise<boolean>;
}
