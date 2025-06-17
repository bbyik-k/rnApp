import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { RootStackParamList } from '../routes';

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
});

export default function BrowserScreen({ route }: Props) {
  const { initialUrl } = route.params;
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );

  const progressAnim = useRef(new Animated.Value(0)).current;

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
        source={{ uri: initialUrl }}
        onNavigationStateChange={event => {
          setUrl(event.url);
        }}
        onLoadProgress={event => {
          // console.log(event.nativeEvent.progress);
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          progressAnim.setValue(0);
        }}
      />
    </SafeAreaView>
  );
}
