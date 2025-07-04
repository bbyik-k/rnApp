import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import { RootStackParamList, RouteNames } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowserScreen from './screens/BrowserScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginButton from './components/LoginButton';
import LoginScreen from './screens/LoginScreen';
import { WebViewProvider } from './components/WebViewProvider';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeIcon = ({ focused, color }: { focused: boolean; color: string }) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <Icon name={iconName} size={26} color={color} />;
};
const ShoppingIcon = ({
  focused,
  color,
}: {
  focused: boolean;
  color: string;
}) => {
  const iconName = focused ? 'shopping' : 'shopping-outline';
  return <Icon name={iconName} size={26} color={color} />;
};

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#03C75A', // 네이버 그린
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: { backgroundColor: '#090909' },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={RouteNames.HOME}
        component={HomeScreen}
        options={{ tabBarLabel: '홈', tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name={RouteNames.SHOPPING}
        component={ShoppingScreen}
        options={{ tabBarLabel: '쇼핑', tabBarIcon: ShoppingIcon }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <WebViewProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={RouteNames.HOME_TAB}
            component={HomeTab}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#0d0d0d',
              },
              headerRight: LoginButton,
            }}
          />
          <Stack.Screen
            name={RouteNames.BROWSER}
            component={BrowserScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.LOGIN}
            component={LoginScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#0d0d0d',
              },
              headerTintColor: '#f9f9f9',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WebViewProvider>
  );
}
