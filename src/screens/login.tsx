import React from 'react';
import {View, Text} from 'react-native';
import {useAuthStore} from '../utils/auth';
import {Button} from '../components/button';

export const LoginScreen = () => {
  const {login} = useAuthStore();

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text className="my-10 text-center text-3xl font-bold  text-gray-900">
        Login to your account
      </Text>
      <Button text="Login" onPress={login} />
    </View>
  );
};
