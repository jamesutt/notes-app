import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/home';
import {LoginScreen} from './screens/login';
import {isLoggedInSelector, useAuthStore} from './utils/auth';
import {QueryClient, QueryClientProvider} from 'react-query';
import './global.css';
import {Note} from './utils/notes';
import {NoteScreen} from './screens/note';
import {Button} from './components/button';
import {NewNoteScreen} from './screens/new-note';
import {Comment} from './utils/comments';
import {CommentScreen} from './screens/comment';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Note: {
    note: Note;
  };
  NewNote: undefined;
  Comment: {
    comment: Comment;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

const queryClient = new QueryClient();

export const App = () => {
  const isLoggedIn = useAuthStore(isLoggedInSelector);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation}) => ({
                  headerTitle: 'Notes',
                  headerRight: NewNoteButton(navigation),
                })}
              />
              <Stack.Screen
                name="Note"
                component={NoteScreen}
                options={{headerTitle: 'View Note'}}
              />
              <Stack.Screen
                name="NewNote"
                component={NewNoteScreen}
                options={{headerTitle: 'New Note', presentation: 'modal'}}
              />
              <Stack.Screen name="Comment" component={CommentScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const NewNoteButton =
  (navigation: NativeStackScreenProps<StackParamList, 'Home'>['navigation']) =>
  () => {
    return <Button onPress={() => navigation.navigate('NewNote')} text="New" />;
  };
