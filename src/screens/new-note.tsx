import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, TextInput, View} from 'react-native';
import {StackParamList} from '../app';
import {Button} from '../components/button';
import {addNote} from '../utils/notes';

type Props = NativeStackScreenProps<StackParamList, 'NewNote'>;

export const NewNoteScreen = (props: Props) => {
  const {navigation} = props;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          text="Save"
          onPress={async () => {
            if (title.length === 0 || body.length === 0) {
              return;
            }

            await addNote({title, body});

            navigation.goBack();
          }}
        />
      ),
    });
  }, [body, navigation, title]);

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={120}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          multiline
          className="text-xl font-semibold text-gray-900 px-4 my-2"
          placeholder="Title"
        />
        <TextInput
          value={body}
          onChangeText={setBody}
          multiline
          className="text-lg text-gray-900 px-4 flex-1"
          placeholder="Body"
        />
      </KeyboardAvoidingView>
    </View>
  );
};
