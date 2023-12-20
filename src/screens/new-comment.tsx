import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {StackParamList} from '../app';
import {Button} from '../components/button';
import {addComment} from '../utils/comments';

type Props = NativeStackScreenProps<StackParamList, 'NewComment'>;

export const NewCommentScreen = (props: Props) => {
  const {navigation} = props;
  const {noteId} = props.route.params;
  const [body, setBody] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          text="Save"
          onPress={async () => {
            if (body.length === 0) {
              return;
            }

            await addComment({body, noteId});

            navigation.goBack();
          }}
        />
      ),
    });
  }, [body, navigation, noteId]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={120}>
        <TextInput
          value={body}
          onChangeText={setBody}
          multiline
          className="text-xl text-gray-900 px-4 my-2"
          placeholder="Body"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
