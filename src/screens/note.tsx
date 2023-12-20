import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {StackParamList} from '../app';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import {Note} from '../utils/notes';
import {useQuery} from 'react-query';
import {Comment, fetchComments} from '../utils/comments';
import {useNavigation} from '@react-navigation/native';
import {useRefreshOnFocus} from '../hooks/use-refresh-on-focus';

type Props = NativeStackScreenProps<StackParamList, 'Note'>;

export const NoteScreen = (props: Props) => {
  const {note} = props.route.params;
  const {
    isLoading,
    data = [],
    refetch,
  } = useQuery(['comments', note.id], () => fetchComments(note.id));
  useRefreshOnFocus(refetch);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'note', title: 'Note'},
    {key: 'comments', title: 'Comments'},
  ]);

  const renderScene = ({
    route,
  }: SceneRendererProps & {
    route: {
      key: string;
      title: string;
    };
  }) => {
    switch (route.key) {
      case 'note':
        return <NoteTab note={note} />;
      case 'comments':
        return <CommentsTab isLoading={isLoading} comments={data} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

const NoteTab = ({note}: {note: Note}) => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <Text className="text-xl font-semibold text-gray-900 px-4 my-2">
          {note.title}
        </Text>
        <Text className="text-lg text-gray-900 px-4 flex-1">{note.body}</Text>
      </ScrollView>
    </View>
  );
};

const CommentsTab = ({
  isLoading,
  comments,
}: {
  isLoading: boolean;
  comments: Comment[];
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <View className="flex flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={comments}
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

const Item = (item: Comment) => {
  const {body} = item;
  const navigation = useNavigation();

  return (
    <Pressable
      className="py-3 px-4 active:bg-gray-200"
      onPress={() => {
        navigation.navigate('Comment', {comment: item});
      }}>
      <Text className="mt-1 text-lg text-gray-900">{body}</Text>
    </Pressable>
  );
};

const Divider = () => (
  <View className="px-4">
    <View className="w-full bg-gray-300 h-[1px]" />
  </View>
);