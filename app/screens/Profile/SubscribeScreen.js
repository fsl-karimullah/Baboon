import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black } from '../../resource/colors'
import { FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR } from '../../resource/style'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { useTailwind } from 'tailwind-rn';
import images from '../../resource/images'
import RadioButtonRN from 'radio-buttons-react-native';
import ButtonPrimary from '../../components/Button/ButtonPrimary'
import { endpoint } from '../../api/apiService'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

//http://127.0.0.1:8000/api/subscribe/2
const SubscribeScreen = () => {
  const tailwind = useTailwind();
  const data = [
    {
      label: '1 Bulan',
      value: '1'
    },
    {
      label: '3 Bulan',
      value: '3'
    },
    {
      label: '6 Bulan',
      value: '6'
    }
  ];

  const subscribeAction = async (value) => {
    const token = await AsyncStorage.getItem('@token'); 
    axios
    .post(endpoint.payment + value, {
      Authorization: 'Bearer ' + token,
    })
    .then(async function (response) {
      console.log('RESPONSE', response);
     
    })
    .catch(function (error) {
      console.log(error);
      
    });
  }

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('m-5')}>
        <Text style={[tailwind(''), styles.text]}>
          Dapatkan akses tidak terbatas
        </Text>
        <Text style={[tailwind(''), styles.textTitle]}>
          Membaca e-book dengan akses tidak terbatas !
        </Text>
        <View>
          <Image source={images.logoSecond} style={[tailwind('self-center'), styles.images]} />
        </View>
        <View>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => subscribeAction(e.value)}
          />
          <View style={tailwind('my-5')}>
            <ButtonPrimary title={'Langganan'} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default SubscribeScreen

const styles = StyleSheet.create({
  text: {
    color: black,
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: widthPercentageToDP(4),
  },
  textTitle: {
    color: black,
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: widthPercentageToDP(5),
    width: widthPercentageToDP(70),
  },
  textTitleTopCard: {
    color: black,
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: widthPercentageToDP(4),
  },
  images: {
    width: widthPercentageToDP(45),
    height: widthPercentageToDP(45),
    resizeMode: 'contain'
  }
});