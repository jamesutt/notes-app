import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {Note, fetchNotes} from '../utils/notes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../app';
import {useNavigation} from '@react-navigation/native';
import {useRefreshOnFocus} from '../hooks/use-refresh-on-focus';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

export const HomeScreen = (_props: Props) => {
  const {isLoading, data = [], refetch} = useQuery('notes', fetchNotes);
  useRefreshOnFocus(refetch);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <View className="flex flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={Divider}
          style={styles.list}
          renderItem={({item}) => <Item {...item} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    height: '100%',
  },
});

const Item = (note: Note) => {
  const {title, body} = note;
  const navigation = useNavigation();

  return (
    <Pressable
      className="py-3 px-4 active:bg-gray-200"
      onPress={() => {
        navigation.navigate('Note', {note});
      }}>
      <Text numberOfLines={1} className="text-xl font-semibold text-gray-900">
        {title}
      </Text>
      <Text numberOfLines={1} className="mt-1 text-lg text-gray-500">
        {body}
      </Text>
    </Pressable>
  );
};

const Divider = () => (
  <View className="px-4">
    <View className="w-full bg-gray-300 h-[1px]" />
  </View>
);
