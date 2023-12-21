import {
  AuthConfiguration,
  AuthorizeResult,
  RefreshResult,
  authorize,
  refresh,
} from 'react-native-app-auth';
import {AUTH_ISSUER, AUTH_CLIENT_ID} from 'react-native-dotenv';
import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {storage} from './mmkv';
import {jsonParse} from './misc';

const AUTH_RESULT_KEY = 'auth';

const jsonAuth = storage.getString(AUTH_RESULT_KEY);
const initialAuthResult = jsonParse<AuthResult>(jsonAuth!, null);

const config: AuthConfiguration = {
  issuer: AUTH_ISSUER,
  clientId: AUTH_CLIENT_ID,
  redirectUrl: 'com.notes.app://callback',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};

type AuthResult = AuthorizeResult | RefreshResult | null;

type AuthStore = {
  authResult: AuthResult;
  login: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => Promise<void>;
};

export const authStore = createStore<AuthStore>()((set, get) => ({
  authResult: initialAuthResult,
  login: async () => {
    try {
      const authResult = await authorize(config);
      if (authResult) {
        console.log('authResult', authResult);
        set({authResult});
        storage.set(AUTH_RESULT_KEY, JSON.stringify(authResult));
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  refresh: async () => {
    const authResult = get().authResult;
    if (!authResult?.refreshToken) {
      throw new Error('Refresh token not found');
    }
    const refreshResult = await refresh(config, {
      refreshToken: authResult.refreshToken,
    });

    if (refreshResult) {
      console.log('refreshResult', refreshResult);
      const newAuthResult = {
        ...authResult,
        ...refreshResult,
      };
      set({
        authResult: newAuthResult,
      });
      storage.set(AUTH_RESULT_KEY, JSON.stringify(newAuthResult));
    }
  },
  logout: async () => {
    set({authResult: null});
    storage.delete(AUTH_RESULT_KEY);
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
