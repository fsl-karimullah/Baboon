import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import images from '../../resource/images';
import {useTailwind} from 'tailwind-rn';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black} from '../../resource/colors';

const Card = ({titleBook, author, imageSrc, onPress}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind('')} onPress={onPress}>
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
    width: 130,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  textTitle: {
    fontSize: 15,
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    width: 120,
  },
  text: {
    fontSize: 12,
    fontFamily: FONT_PRIMARY_REGULAR,
  },
});
