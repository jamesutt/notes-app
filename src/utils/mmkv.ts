import {STORAGE_ENCRYPTION_KEY} from 'react-native-dotenv';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'mmkv.default',
  encryptionKey: STORAGE_ENCRYPTION_KEY,
});
