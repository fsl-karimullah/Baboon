import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import HeaderBack from '../../components/Header/HeaderBack';
import {useTailwind} from 'tailwind-rn';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const WebViewScreen = ({route}) => {
  const [isLoadingWeb, setisLoadingWeb] = useState(false);
  const tailwind = useTailwind();
  const {uri} = route.params;
  console.log('URI', uri);
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: uri}}
        startInLoadingState={true}
        scrollEnabled={true}
        incognito={true}
        cacheEnabled={false}
      />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
});
