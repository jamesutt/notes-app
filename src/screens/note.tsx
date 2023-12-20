import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {StackParamList} from '../app';

type Props = NativeStackScreenProps<StackParamList, 'Note'>;

export const NoteScreen = (props: Props) => {
  const {note} = props.route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <Text className="text-xl font-semibold text-gray-900 px-4 my-2">
          {note.title}
        </Text>
        <Text className="text-lg text-gray-900 px-4 flex-1">{note.body}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
