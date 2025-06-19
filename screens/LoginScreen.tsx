import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { RootStackParamList, RouteNames } from '../routes';
import { useNavigation } from '@react-navigation/native';
import { WebViewContext } from '../components/WebViewProvider';

const style = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d0d0d' },
});

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';
type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<Props>();
  const context = useContext(WebViewContext);

  useEffect(() => {
    // console.log(context?.webViewRefs.current);
    if (context?.webViewRefs.current != null) {
      context.webViewRefs.current.forEach(webView => {
        console.log('webView', webView);
        // webView.reload();
      });
    }
  }, [context]);

  return (
    <SafeAreaView style={style.safeArea}>
      <WebView
        source={{ uri: LOGIN_URL }}
        onNavigationStateChange={event => {
          if (event.url === 'https://www.naver.com') {
            if (context?.webViewRefs.current != null) {
              context.webViewRefs.current.forEach(webView => {
                console.log('webView', webView);
                webView.reload();
              });
            }
            // navigation.goBack();
            // navigation.navigate(RouteNames.HOME_TAB);
            navigation.reset({
              index: 0,
              routes: [{ name: RouteNames.HOME_TAB }],
            });
          }
        }}
      />
    </SafeAreaView>
  );
}
