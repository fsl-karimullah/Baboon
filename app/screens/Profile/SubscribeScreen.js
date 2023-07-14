import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
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
import { connect } from 'react-redux'
import { savePaymentData } from '../../redux/actions/getPaymentData'

const SubscribeScreen = ({savePaymentData,navigation,paymentData}) => {
  const tailwind = useTailwind();
  const [Month, setMonth] = useState({})
  const dataa = [
    {
      label: '1 Bulan',
      value: '1'
    },
    {
      label: '2 Bulan',
      value: '2'
    },
    {
      label: '3 Bulan',
      value: '3'
    }
  ];

  const subscribeAction = async (value) => {
    const token = await AsyncStorage.getItem('@token'); 
    await axios
   .post(endpoint.payment + value,{}, {
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json' 
    },
  }).then(async function (response) {
      console.log('RESPONSE', response.data);
      savePaymentData(response.data)
      console.log('PAYMENT',paymentData.data.redirect_url);
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
            data={dataa}
            selectedBtn={(e) => subscribeAction(e.value)} 
            textColor='#000'
          />
          <View style={tailwind('my-5')}>
            <ButtonPrimary title={'Langganan'} onPress={() => navigation.navigate('WebViewScreen', {
              uri: paymentData.data.redirect_url 
            })}  />
          </View>
        </View>
      </View>
    </View>
  )
}

const mapDispatchToProps = {
  savePaymentData,
  
};

const mapStateToProps = state => {
  return {
    paymentData: state.paymentData.data,
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeScreen);

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