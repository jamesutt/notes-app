import React from 'react';
import {Button, View} from 'react-native';
import {useAuthStore} from '../utils/auth';

export const LoginScreen = () => {
  const {login} = useAuthStore();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Login" onPress={login} />
    </View>
  );
};
