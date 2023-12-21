import {
  AuthConfiguration,
  AuthorizeResult,
  RefreshResult,
  authorize,
  logout,
  refresh,
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
  authResult: AuthorizeResult | RefreshResult | null;
  login: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => Promise<void>;
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
      set({
        authResult: {
          ...authResult,
          ...refreshResult,
        },
      });
    }
  },
  logout: async () => {
    try {
      const authResult = get().authResult;
      if (authResult?.idToken) {
        await logout(config, {
          idToken: authResult.idToken,
          postLogoutRedirectUrl: '',
        });
      }
    } catch (e) {
      console.log(e);
    }
    set({authResult: null});
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
