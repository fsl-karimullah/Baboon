import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {black, COLOR_BLACK} from '../../resource/colors';
import {FONT_PRIMARY_REGULAR, FONT_PRIMARY_BOLD} from '../../resource/style';
import images from '../../resource/images';

const SplashScreen = ({navigation}) => {
  const tailwind = useTailwind();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={tailwind('self-center ')}>
        <Image style={styles.imageLogo} source={images.logoSecond} />
      </View>
      <View style={tailwind('self-center absolute bottom-5 justify-end flex')}>
        <Text style={styles.text}>FROM</Text>

        <Image style={styles.imageLogo2} source={images.logoFirst} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: black,
    textAlign: 'center',
    fontFamily: FONT_PRIMARY_BOLD,
  },
  textTitle: {
    fontSize: 30,
    color: black,
    textAlign: 'center',
    fontFamily: FONT_PRIMARY_BOLD,
  },
  imageLogo: {
    width: widthPercentageToDP(20),
    height: heightPercentageToDP(15),
  },
  imageLogo2: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(15),
    resizeMode: 'contain',
  },
});
