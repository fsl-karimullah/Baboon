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
import axios from 'axios';
import {showErrorToast, showSuccessToast} from '../../resource/Helper';
const Register = ({navigation, saveUserData}) => {
  const tailwind = useTailwind();
  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [instance, setInstance] = useState('');
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const userRegister = async () => {
    if (
      Name === '' ||
      password === '' ||
      Email === '' ||
      ConfirmPassword === ''
    ) {
      showErrorToast('Semua Data Wajib Di Isi !');
    } else if (reg.test(Email) === false) {
      showErrorToast('Mohon Masukkan Email Yang Valid !');
    } else {
      axios
        .post(endpoint.registerUser, {
          name: Name,
          email: Email,
          // instance: instance,
          password: password,
          password_confirmation: ConfirmPassword,
        })
        .then(function (response) {
          console.log(response.data);
          saveUserData(response.data);
          showSuccessToast('Register Berhasil');
          navigation.navigate('Login');
        })
        .catch(function (error) {
          console.log(error.request._response);
          showErrorToast(error.request._response);
        });
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
              onchangeText={Name => setName(Name)}
            />
            {/* <InputCustom
              title="Instansi"
              placeholder={'Contoh : Politeknik Negeri Jember'}
              value={instance}
              onchangeText={instance => setInstance(instance)}
            /> */}

            <InputCustom
              title="Email"
              placeholder={'Email'}
              value={Email}
              onchangeText={Email => setEmail(Email)}
            />
            <InputCustom
              title="Password"
              isSecureTextEntry
              placeholder={'Password'}
              value={password}
              onchangeText={text => setPassword(text)}
            />
            <InputCustom
              title="Confirm Password"
              isSecureTextEntry
              placeholder={'Confirm Password'}
              value={ConfirmPassword}
              onchangeText={text => setConfirmPassword(text)}
            />
            <View>
              <Text style={[tailwind('my-5'), styles.text]}>
                By Signing In, You re agree to our Terms and Conditions and
                Privacy Policy.
              </Text>
            </View>
          </View>
          <View style={tailwind('mx-10 my-5')}>
            <ButtonPrimary onPress={userRegister} title="Sign Up" />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  saveUserData,
};

const mapStateToProps = state => ({});
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
