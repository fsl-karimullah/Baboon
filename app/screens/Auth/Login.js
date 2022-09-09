import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import InputCustom from '../../components/InputCustom';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {black, blue, blue_primary} from '../../resource/colors';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import HeaderBack from '../../components/Header/HeaderBack';
import images from '../../resource/images';
const Login = ({navigation}) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind('flex-1 bg-white pb-10')}>
      {/* <HeaderBack title={'Sign In'} onPress={() => navigation.goBack()} /> */}
      <ScrollView style={tailwind('px-5')} showsVerticalScrollIndicator={false}>
        <View style={tailwind('self-center')}>
          <Image
            style={[tailwind('my-5'), styles.imageLogin]}
            source={images.signInImg}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View>
            <View>
              <Text style={[tailwind('my-5'), styles.textTitle]}>Sign In</Text>
            </View>
            <InputCustom title="Email" placeholder={'Email'} />
            <InputCustom
              title="Password"
              isSecureTextEntry
              placeholder={'Password'}
            />
            <View>
              <Text style={[tailwind('my-5'), styles.text]}>
                By Signing In, You re agree to our Terms and Conditions and
                Privacy Policy.
              </Text>
            </View>
          </View>

          <View>
            <ButtonPrimary
              title="Sign In"
              onPress={() => navigation.navigate('Homepage')}
            />
            <View style={tailwind('self-center flex-row')}>
              <Text style={[tailwind('my-5'), styles.text]}>
                Belum memiliki akun ?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={tailwind('self-center ')}>
                <Text style={[styles.textBottom]}>Register Disini.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageLogin: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(35),
    margin: 4,
    resizeMode: 'contain',
  },
  textTitle: {
    fontSize: 30,
    color: black,
    fontFamily: FONT_PRIMARY_BOLD,
  },
  text: {
    fontSize: 13,
    color: black,
    fontFamily: FONT_PRIMARY_REGULAR,
  },
  textBottom: {
    fontSize: 13,
    color: blue_primary,
    fontFamily: FONT_PRIMARY_BOLD,
  },
});
