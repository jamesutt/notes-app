import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {StackParamList} from '../app';
import {Button, ButtonText} from '../components/button';
import {addComment} from '../utils/comments';

type Props = NativeStackScreenProps<StackParamList, 'NewComment'>;

export const NewCommentScreen = (props: Props) => {
  const {navigation} = props;
  const {noteId} = props.route.params;
  const [body, setBody] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => {
            if (body.length > 0) {
              Alert.alert('Go back?', 'Your unsaved changes will be lost.', [
                {
                  text: 'Keep Editing',
                  style: 'cancel',
                },
                {
                  text: 'Discard Changes',
                  onPress: () => {
                    navigation.goBack();
                  },
                  style: 'destructive',
                },
              ]);
            } else {
              navigation.goBack();
            }
          }}>
          <ButtonText>Cancel</ButtonText>
        </Button>
      ),
      headerRight: () => (
        <Button
          onPress={async () => {
            if (body.length === 0) {
              Alert.alert(
                'Missing Information',
                'Please fill in both the title and body fields.',
                [
                  {
                    text: 'OK',
                  },
                ],
              );
              return;
            }

            await addComment({body, noteId});

            navigation.goBack();
          }}>
          <ButtonText>Save</ButtonText>
        </Button>
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
