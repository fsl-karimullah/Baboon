import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import InputCustom from '../../components/InputCustom';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {black, blue} from '../../resource/colors';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import HeaderBack from '../../components/Header/HeaderBack';
import images from '../../resource/images';
const Register = ({navigation}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 bg-white pb-10')}>
      {/* <HeaderBack title={'Sign Up'} onPress={() => navigation.goBack()} /> */}
      <ScrollView>
        <View style={tailwind('self-center')}>
          <Image
            style={[tailwind('my-5'), styles.imageRegister]}
            source={images.signUpImg}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={tailwind('mx-10')}>
            <View>
              <Text style={[tailwind('my-5'), styles.textTitle]}>Sign Up</Text>
            </View>
            <InputCustom title="Email" placeholder={'Email'} />
            <InputCustom
              title="Password"
              isSecureTextEntry
              placeholder={'Password'}
            />
            <InputCustom
              title="Confirm Password"
              isSecureTextEntry
              placeholder={'Confirm Password'}
            />
            <View>
              <Text style={[tailwind('my-5'), styles.text]}>
                By Signing In, You re agree to our Terms and Conditions and
                Privacy Policy.
              </Text>
            </View>
          </View>
          <View style={tailwind('mx-10 my-5')}>
            <ButtonPrimary title="Sign Up" />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  imageRegister: {
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
});
