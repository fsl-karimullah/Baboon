import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import images from '../../resource/images';
import {useTailwind} from 'tailwind-rn';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black} from '../../resource/colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Card = ({titleBook, author, imageSrc, onPress, customStyleContainer}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={customStyleContainer} onPress={onPress}>
      <View style={tailwind('mr-3')}>
        <Image source={imageSrc} style={[tailwind(), styles.imageCard]} />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[tailwind('mt-2'), styles.textTitle]}>
          {titleBook}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[tailwind(), styles.text]}>
          {author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  imageCard: {
    width: widthPercentageToDP('40%'),
    height: heightPercentageToDP('30%'),
    resizeMode: 'contain',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  textTitle: {
    fontSize: widthPercentageToDP(4),
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    width: widthPercentageToDP('30%'),
  },
  text: {
    fontSize: widthPercentageToDP(3),
    fontFamily: FONT_PRIMARY_REGULAR,
  },
});
