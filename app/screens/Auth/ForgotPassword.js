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
  import axios from 'axios';
  import {endpoint} from '../../api/apiService';
  import {showErrorToast, showSuccessToast} from '../../resource/Helper';
  import {useState} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {
    resetUserData,
    saveUserData,
  } from '../../redux/actions/userRegisterAction';
  import {connect} from 'react-redux';
  const ForgotPassword = ({navigation, saveUserData}) => {
    const tailwind = useTailwind();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const userLogin = async () => {
      resetUserData();
      if (Email === '' || password === '') {
        showErrorToast('Semua Data Wajib Di Isi !');
      } else if (reg.test(Email) === false) {
        showErrorToast('Mohon Masukkan Email Yang Valid !');
      } else {
        axios
          .post(endpoint.loginUser, {
            email: Email, 
            // instance: instance,
            password: password,
          })
          .then(async function (response) {
            console.log('LOGIN RESPONSE', response.data.data);
            saveUserData({
              name: response.data.data.name,
              email: response.data.data.email,
              phoneNum: response.data.data.phone_number,
              instance: response.data.data.instance,
              is_subscribed: response.data.data.is_subscribed,
            });
            await AsyncStorage.setItem('@token', response.data.data.token);
            showSuccessToast('Login Berhasil');
            setEmail('');
            setPassword('');
            navigation.navigate('Homepage');
          })
          .catch(function (error) {
            console.log(error.request._response);
            showErrorToast("Mohon cek email dan password anda kembali");
          });
      }
    };
    return (
      <SafeAreaView style={tailwind('flex-1 bg-white ')}>
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
                <Text style={[tailwind('my-5'), styles.textTitle]}>Reset Password</Text>
              </View>
              <InputCustom
                title="Email"
                placeholder={'Email'}
                value={Email}
                onchangeText={Email => setEmail(Email)}
              />
              <View>
                <Text style={[tailwind('my-5'), styles.text]}>
                  Cek email anda untuk mendapatkan notifikasi reset password dari Baboon.
                </Text>
              </View>
              
            </View>
  
            <View>
              <ButtonPrimary title="Send Otp" onPress={userLogin} />
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
  
  const mapDispatchToProps = {
    saveUserData,
  };
  
  const mapStateToProps = state => ({});
  
  export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
  
  const styles = StyleSheet.create({
    imageLogin: {
      width: widthPercentageToDP(100),
      height: heightPercentageToDP(30),
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
  