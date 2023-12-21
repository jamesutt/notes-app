import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/home';
import {LoginScreen} from './screens/login';
import {isLoggedInSelector, useAuthStore} from './utils/auth';
import {QueryClient, QueryClientProvider} from 'react-query';
import './global.css';
import {Note} from './utils/notes';
import {NoteScreen} from './screens/note';
import {NewNoteScreen} from './screens/new-note';
import {Comment} from './utils/comments';
import {CommentScreen} from './screens/comment';
import {NewCommentScreen} from './screens/new-comment';
import {ProfileScreen} from './screens/profile';

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
  NewComment: {
    noteId: number;
  };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const queryClient = new QueryClient();

export const App = () => {
  const isLoggedIn = useAuthStore(isLoggedInSelector);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#0ea5e9',
            headerTitleStyle: {
              color: '#0f172a',
            },
          }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: 'Notes',
                }}
              />
              <Stack.Screen
                name="Note"
                component={NoteScreen}
                options={{headerTitle: '', headerShadowVisible: false}}
              />
              <Stack.Screen
                name="NewNote"
                component={NewNoteScreen}
                options={{
                  headerTitle: 'New Note',
                  presentation: 'modal',
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen name="Comment" component={CommentScreen} />
              <Stack.Screen
                name="NewComment"
                component={NewCommentScreen}
                options={{
                  headerTitle: 'New Comment',
                  presentation: 'modal',
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
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
