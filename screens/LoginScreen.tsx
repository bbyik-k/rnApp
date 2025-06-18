import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { RootStackParamList } from '../routes';
import { useNavigation } from '@react-navigation/native';

const style = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d0d0d' },
});

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';
type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<Props>();
  return (
    <SafeAreaView style={style.safeArea}>
      <WebView
        source={{ uri: LOGIN_URL }}
        onNavigationStateChange={event => {
          console.log(`onNavigationStateChange: ${event.url}`);
          if (event.url === 'https://www.naver.com') {
            navigation.goBack();
          }
        }}
      />
    </SafeAreaView>
  );
}
