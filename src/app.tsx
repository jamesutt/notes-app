import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/home';
import {LoginScreen} from './screens/login';
import {isLoggedInSelector, useAuthStore} from './utils/auth';
import {QueryClient, QueryClientProvider} from 'react-query';
import './global.css';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

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
                options={{headerTitle: 'Notes'}}
              />
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
