import React from 'react';
import {Button, View} from 'react-native';
import {AuthConfiguration, authorize} from 'react-native-app-auth';
import {AUTH_ISSUER, AUTH_CLIENT_ID} from 'react-native-dotenv';

const config: AuthConfiguration = {
  issuer: AUTH_ISSUER,
  clientId: AUTH_CLIENT_ID,
  redirectUrl: 'com.notes.app://callback',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};

const App = () => {
  const login = async () => {
    try {
      const result = await authorize(config);
      console.log('result', result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default App;
