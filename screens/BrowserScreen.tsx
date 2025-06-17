import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
});

export default function BrowserScreen({ route }: Props) {
  const { initialUrl } = route.params;
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );

  return (
    <SafeAreaView style={style.safearea}>
      <View style={style.urlContainer}>
        <Text style={style.urlText}>{urlTitle}</Text>
      </View>
      <WebView
        source={{ uri: initialUrl }}
        onNavigationStateChange={event => {
          setUrl(event.url);
        }}
      />
    </SafeAreaView>
  );
}
