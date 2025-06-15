import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import { RouteNames } from './routes';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#03C75A', // 네이버 그린
          tabBarStyle: { backgroundColor: '#fff' },
          // headerShown: false,
        }}
      >
        <Tab.Screen name={RouteNames.HOME} component={HomeScreen} />
        <Tab.Screen name={RouteNames.SHOPPING} component={ShoppingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
