import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {Note, fetchNotes} from '../utils/notes';

export const HomeScreen = () => {
  const {isLoading, data = []} = useQuery('notes', fetchNotes);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <View className="flex flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <View className="py-2">
          <FlatList
            data={data}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={Divider}
            className="h-full"
            renderItem={({item}) => <Item {...item} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const Item = ({title, body}: Note) => (
  <View className="py-2 px-4">
    <Text numberOfLines={1} className="text-xl font-semibold text-gray-900">
      {title}
    </Text>
    <Text numberOfLines={1} className="mt-1 text-lg text-gray-500">
      {body}
    </Text>
  </View>
);

const Divider = () => (
  <View className="px-4">
    <View className="w-full bg-gray-300 h-[1px]" />
  </View>
);
