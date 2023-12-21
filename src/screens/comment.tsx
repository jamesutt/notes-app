import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../app';
import {View, ScrollView, Text, Alert} from 'react-native';
import {Button} from '../components/button';
import {deleteComment} from '../utils/comments';
import TrashIcon from '../components/icons/trash';

type Props = NativeStackScreenProps<StackParamList, 'Comment'>;

export const CommentScreen = (props: Props) => {
  const {navigation} = props;
  const {comment} = props.route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            Alert.alert(
              'Delete this comment?',
              'Your comment will be permanently deleted',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: async () => {
                    await deleteComment(comment.id);
                    navigation.goBack();
                  },
                  style: 'destructive',
                },
              ],
            );
          }}>
          <TrashIcon className="text-rose-500" />
        </Button>
      ),
    });
  }, [comment.id, navigation]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <Text className="text-xl text-gray-900 px-4 my-2">{comment.body}</Text>
      </ScrollView>
    </View>
  );
};
