import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList, RouteNames } from '../routes';
import CookieManager from '@react-native-cookies/cookies';
import { WebViewContext } from './WebViewProvider';

type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginButton() {
  const context = useContext(WebViewContext);
  const navigation = useNavigation<Props>();
  const isFocused = useIsFocused();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const iconName = isLoggedIn ? 'logout' : 'login';
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    if (isFocused) {
      CookieManager.get('https://.naver.com', true).then(cookie => {
        // console.log('cookie:', cookie);
        if (cookie.NID_SES) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  }, [isFocused]);

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);
  const onPressLogout = useCallback(async () => {
    await CookieManager.clearAll(true);
    setIsLoggedIn(false);
    if (context?.webViewRefs.current != null) {
      context.webViewRefs.current.forEach(webView => {
        webView.reload();
      });
    }
  }, [context]);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <Icon name={iconName} color={'#f0f0f0'} size={24} />
    </TouchableOpacity>
  );
}
