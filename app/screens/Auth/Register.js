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
import React, {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import InputCustom from '../../components/InputCustom';
import {saveUserData} from '../../redux/actions/userRegisterAction';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {black, blue} from '../../resource/colors';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import HeaderBack from '../../components/Header/HeaderBack';
import images from '../../resource/images';
import {endpoint} from '../../api/apiService';
import {connect} from 'react-redux';
const Register = ({navigation, saveUserData}) => {
  const tailwind = useTailwind();
  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const userRegister = async () => {
    try {
      // var details = {
      //   name: Name,
      //   email: Email,
      //   password: password,
      //   password_confirmation: ConfirmPassword,
      // };

      // var formBody = [];
      // for (var property in details) {
      //   var encodedKey = encodeURIComponent(property);
      //   var encodedValue = encodeURIComponent(details[property]);
      //   formBody.push(encodedKey + '=' + encodedValue);
      // }
      // formBody = formBody.join('&');

      // const response = await fetch(endpoint.registerUser, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: formBody,
      // });
      const response = await fetch(endpoint.registerUser, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: Name,
          email: Email,
          password: password,
          password_confirmation: ConfirmPassword,
        }).toString(),
      });

      console.log(response);
      // saveUserData(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={tailwind('flex-1 bg-white ')}>
      {/* <HeaderBack title={'Sign Up'} onPress={() => navigation.goBack()} /> */}
      <ScrollView>
        <View style={tailwind('self-center')}>
          <Image
            style={[tailwind('my-5'), styles.imageRegister]}
            source={images.signUpImg}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'margin' : 'height'}>
          <View style={tailwind('mx-10')}>
            <View>
              <Text style={[tailwind('my-5'), styles.textTitle]}>Sign Up</Text>
            </View>
            <InputCustom
              title="Name"
              placeholder={'Name'}
              value={Name}
              onchangeText={setName}
            />
            {/* <InputCustom title="University" placeholder={'University'} /> */}
            <InputCustom
              title="Email"
              placeholder={'Email'}
              value={Email}
              onchangeText={setEmail}
            />
            <InputCustom
              title="Password"
              isSecureTextEntry
              placeholder={'Password'}
              value={password}
              onchangeText={setPassword}
            />
            <InputCustom
              title="Confirm Password"
              isSecureTextEntry
              placeholder={'Confirm Password'}
              value={ConfirmPassword}
              onchangeText={setConfirmPassword}
            />
            <View>
              <Text style={[tailwind('my-5'), styles.text]}>
                By Signing In, You re agree to our Terms and Conditions and
                Privacy Policy.
              </Text>
            </View>
          </View>
          <View style={tailwind('mx-10 my-5')}>
            <ButtonPrimary onPress={() => userRegister()} title="Sign Up" />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  saveUserData,
};

const mapStateToProps = state => {
  return {
    bookData: state.bookData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);

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
