import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RouteNames } from '../routes';

type Props = NativeStackScreenProps<RootStackParamList>;

const style = StyleSheet.create({
  safearea: { flex: 1 },
  contentContainerStyle: { flex: 1 },
});

const START_URI = 'https://shopping.naver.com/ns/home';

export default function ShoppingScreen({ navigation }: Props) {
  const webViewRef = useRef<WebView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    webViewRef.current?.reload();
  }, []);

  return (
    <SafeAreaView style={style.safearea}>
      <ScrollView
        contentContainerStyle={style.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WebView
          ref={webViewRef}
          source={{ uri: START_URI }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onShouldStartLoadWithRequest={request => {
            console.log(request);
            if (
              request.url.startsWith(START_URI) ||
              request.mainDocumentURL?.startsWith(START_URI)
            ) {
              return true;
            }

            if (request.url != null && request.url.startsWith('https://')) {
              navigation.navigate(RouteNames.BROWSER, {
                initialUrl: request.url,
              });
              return false;
            }
            return true;
          }}
          onLoad={() => {
            setRefreshing(false);
          }}
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/** 
 * 
 * Rn Webview 컴포넌트에서 

renderLoading={() => <></>}
          startInLoadingState={true}

각각의 의미는?
 */
