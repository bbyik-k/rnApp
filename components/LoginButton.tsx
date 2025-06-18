import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList, RouteNames } from '../routes';

type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginButton() {
  // const navigation = useNavigation();
  const navigation = useNavigation<Props>();
  const isLoggedIn = false;
  const iconName = isLoggedIn ? 'logout' : 'login';

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);
  const onPressLogout = useCallback(() => {}, []);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <Icon name={iconName} color={'#f0f0f0'} size={24} />
    </TouchableOpacity>
  );
}
