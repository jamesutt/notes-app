import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useAuthStore} from '../utils/auth';
import {Button, ButtonText} from '../components/button';
import LoginImage from '../assets/login.svg';

export const LoginScreen = () => {
  const {login} = useAuthStore();

  return (
    <SafeAreaView className="flex flex-1 items-center justify-center bg-white">
      <View className="h-[200px] w-[200px] mb-10">
        <LoginImage width="100%" height="100%" />
        <Text className="text-slate-300 text-center">
          Illustration by popsy.co
        </Text>
      </View>
      <Text className="text-center mt-4 text-3xl font-bold  text-slate-900">
        Welcome to Notes
      </Text>
      <Text className="mt-2 mb-10 text-center text-xl text-slate-700">
        Login to Get Started
      </Text>
      <View className="px-16 w-full">
        <Button className="w-full bg-sky-100 rounded-lg py-3" onPress={login}>
          <ButtonText className="text-center text-sky-500">Login</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};
