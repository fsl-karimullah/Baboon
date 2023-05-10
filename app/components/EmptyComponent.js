import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import images from '../resource/images'
import { useTailwind } from 'tailwind-rn/dist'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black } from '../resource/colors'
import { FONT_PRIMARY_BOLD } from '../resource/style'
const EmptyComponent = ({title}) => {
  const tailwind = useTailwind()
  return (
    <View style={tailwind('items-center flex')}>
      <Image source={images.emptyIcon} style={styles.imageIcon} />
      <Text style={[tailwind('text-center'), styles.textTitle]}>{title}</Text>
    </View>
  )
}

export default EmptyComponent

const styles = StyleSheet.create({
imageIcon:{
  width:widthPercentageToDP(40),
  height:heightPercentageToDP(20)
},
textTitle: {
  color: black,
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: widthPercentageToDP(5),
  width: widthPercentageToDP(70),
},
})