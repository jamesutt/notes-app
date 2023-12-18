import {
  AuthConfiguration,
  AuthorizeResult,
  authorize,
} from 'react-native-app-auth';
import {AUTH_ISSUER, AUTH_CLIENT_ID} from 'react-native-dotenv';
import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';

const config: AuthConfiguration = {
  issuer: AUTH_ISSUER,
  clientId: AUTH_CLIENT_ID,
  redirectUrl: 'com.notes.app://callback',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};

type AuthStore = {
  authResult: AuthorizeResult | null;
  login: () => Promise<boolean>;
  logout: () => Promise<boolean>;
};

export const authStore = createStore<AuthStore>()((set, get) => ({
  authResult: null,
  login: async () => {
    try {
      const authResult = await authorize(config);
      if (authResult) {
        console.log('authResult', authResult);
        set({authResult});
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  logout: async () => {
    return true;
  },
}));

export function useAuthStore(): AuthStore;
export function useAuthStore<T>(selector: (state: AuthStore) => T): T;
export function useAuthStore<T>(selector?: (state: AuthStore) => T) {
  return useStore(authStore, selector!);
}

export const isLoggedInSelector = (state: AuthStore) =>
  !!state.authResult?.accessToken;
