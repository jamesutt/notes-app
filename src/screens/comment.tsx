import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../app';
import {View, ScrollView, Text, Alert} from 'react-native';
import {Button} from '../components/button';
import {deleteComment} from '../utils/comments';

type Props = NativeStackScreenProps<StackParamList, 'Comment'>;

export const CommentScreen = (props: Props) => {
  const {navigation} = props;
  const {comment} = props.route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          text="Delete"
          textClassName="text-red-500"
          onPress={() => {
            Alert.alert(
              'Are you sure you want to delete this comment?',
              undefined,
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
          }}
        />
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
