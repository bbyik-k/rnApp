import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { RootStackParamList } from '../routes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebViewContext } from '../components/WebViewProvider';
import { useBackHandler } from '@react-native-community/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'browser'>;

const style = StyleSheet.create({
  safearea: { flex: 1, backgroundColor: '#090909' },
  urlContainer: {
    backgroundColor: '#090909',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  urlText: { fontSize: 12, color: '#f0f0f0' },
  loadingBarBackground: { height: 3, backgroundColor: '#f0f0f0' },
  loadingBar: { height: '100%', backgroundColor: 'green', width: '50%' },
  navigator: {
    backgroundColor: '#090909',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  button: {
    width: 30,
    height: 30,
    padding: 4,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverIconOutline: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverIconText: {
    color: '#f0f0f0',
  },
});

const NavButton = ({
  iconName,
  disabled,
  onPress,
}: {
  iconName: string;
  disabled?: boolean;
  onPress?: () => void;
}) => {
  const color = disabled ? '#999999' : '#f0f0f0';
  return (
    <TouchableOpacity
      style={style.button}
      disabled={disabled}
      onPress={onPress}
    >
      <Icon name={iconName} color={color} size={26} />
    </TouchableOpacity>
  );
};

const DISABLE_PINCH_ZOOM = `(function() {
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);

  document.body.style['user-select'] = 'none';
  document.body.style['-webkit-user-select'] = 'none';
})();`;

export default function BrowserScreen({ route, navigation }: Props) {
  const context = useContext(WebViewContext);
  const { initialUrl } = route.params;
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );

  const progressAnim = useRef(new Animated.Value(0)).current;

  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useBackHandler(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return true;
    }
    return false; //default
  });

  return (
    <SafeAreaView style={style.safearea}>
      <View style={style.urlContainer}>
        <Text style={style.urlText}>{urlTitle}</Text>
      </View>
      <View style={style.loadingBarBackground}>
        <Animated.View
          style={[
            style.loadingBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <WebView
        ref={ref => {
          webViewRef.current = ref;
          if (ref !== null) {
            context?.addWebView(ref);
          }
        }}
        source={{ uri: initialUrl }}
        onNavigationStateChange={event => {
          setCanGoBack(event.canGoBack);
          setCanGoForward(event.canGoForward);
          setUrl(event.url);
        }}
        onLoadProgress={event => {
          // console.log(event.nativeEvent.progress);
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          progressAnim.setValue(0);
        }}
        injectedJavaScript={DISABLE_PINCH_ZOOM}
        onMessage={() => {}}
        allowsLinkPreview={false}
      />
      <View style={style.navigator}>
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={style.naverIconOutline}>
            <Text style={style.naverIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavButton
          iconName="arrow-left"
          onPress={() => {
            webViewRef.current?.goBack();
          }}
        />
        <NavButton
          iconName="arrow-right"
          disabled={!canGoForward}
          onPress={() => {
            webViewRef.current?.goForward();
          }}
        />
        <NavButton
          iconName="refresh"
          onPress={() => {
            webViewRef.current?.reload();
          }}
        />
        <NavButton
          iconName="share"
          onPress={() => {
            Share.share({ message: url });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
