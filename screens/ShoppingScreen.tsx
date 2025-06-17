import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList, RouteNames } from '../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function ShoppingScreen({ navigation }: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RouteNames.BROWSER, {
            initialUrl: 'https://m.naver.com',
          });
        }}
      >
        <Text>Go To Browser</Text>
      </TouchableOpacity>
      <Icon name="home" size={50} color="#03C75A" />
    </View>
  );
}
