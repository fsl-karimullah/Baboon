import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black } from '../../resource/colors'
import { FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR } from '../../resource/style'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import {useTailwind} from 'tailwind-rn';
import images from '../../resource/images'
import RadioButtonRN from 'radio-buttons-react-native';
import ButtonPrimary from '../../components/Button/ButtonPrimary'
const SubscribeScreen = () => {
  const tailwind = useTailwind();
  const data = [
    {
      label: '1 Bulan',
      value:'1'
     },
     {
      label: '3 Bulan',
      value:'3'
     },
     {
      label: '6 Bulan',
      value:'6'
     }
    ];
    
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
        <Image source={images.logoSecond} style={[tailwind('self-center'),styles.images]} />
      </View>
      <View>
      <RadioButtonRN
  data={data}
  selectedBtn={(e) => console.log(e)}
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
  images:{
    width:widthPercentageToDP(45),
    height:widthPercentageToDP(45),
    resizeMode:'contain'
  }
});