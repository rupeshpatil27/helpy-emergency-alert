import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './src/common/store';

import firebases from './firebase';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import SetProfile from './src/screens/SetProfile';

import DrawerNavigation from './src/Drawernavigation/DrawerNavigation';
import DrawerNavigation1 from './src/Drawernavigation/DrawerNavigation1';
import AddFriend from './src/Drawernavigation/componets/AddFriends/AddFriend';
import MapScreen from './src/Drawernavigation/componets/MapScreen';
// import MainLayout from './src/screens/MainLayout';
import EditScreen from './src/Drawernavigation/componets/EditScreen';
import FriendScreen from './src/Drawernavigation/componets/FriendScreen';

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  const {messaging} = firebases();
  const [initialRoute, setInitialRoute] = useState('SplashScreen');

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      const id = remoteMessage.data.id
      const name = remoteMessage.data.name
      navigation.navigate(remoteMessage.data.type);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setInitialRoute(remoteMessage.data.type);
        }
      });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetProfile" component={SetProfile} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="AddFriend" component={AddFriend} options={{ headerShown: false }} />
            <Stack.Screen name="FriendScreen" component={FriendScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;

// >ngrok http 3000



