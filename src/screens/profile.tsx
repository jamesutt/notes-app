import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityIndicator, Image, SafeAreaView, Text, View} from 'react-native';
import {StackParamList} from '../app';
import {Button, ButtonText} from '../components/button';
import {useAuthStore} from '../utils/auth';
import {useQuery} from 'react-query';
import {fetchProfile} from '../utils/profile';

type Props = NativeStackScreenProps<StackParamList, 'Profile'>;

export const ProfileScreen = (_props: Props) => {
  const {logout} = useAuthStore();
  const {isLoading, data} = useQuery('profile', fetchProfile);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="my-8 items-center">
        {isLoading ? (
          <ActivityIndicator />
        ) : data ? (
          <>
            <Image
              className="w-20 h-20 rounded-full"
              source={{uri: data.picture}}
            />
            <Text className="text-2xl font-medium text-slate-900 mt-3">
              {data.name} ({data.nickname})
            </Text>
            <Text className="text-lg text-slate-500 mt-1">{data.email}</Text>
          </>
        ) : null}
      </View>
      <Button className="bg-rose-100 rounded-lg mx-4 py-3" onPress={logout}>
        <ButtonText className="text-center text-rose-500">Logout</ButtonText>
      </Button>
    </SafeAreaView>
  );
};
