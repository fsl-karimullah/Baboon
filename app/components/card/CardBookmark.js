import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black} from '../../resource/colors';
import images from '../../resource/images';
const CardBookmark = ({title, author, onPress, imgSrc}) => {
  const tailwind = useTailwind();
  return (
    <View
      onPress={onPress}
      style={tailwind(
        'flex-row justify-between border-b-2 border-gray-300 mx-5 py-3',
      )}>
      <TouchableOpacity style={tailwind('flex-row')}>
        <Image style={styles.imageBook} source={imgSrc} />
        <View style={tailwind('m-5')}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textAuthor}>{author}</Text>
        </View>
      </TouchableOpacity>
      <View style={tailwind('self-start')}>
        <TouchableOpacity>
          <Image style={styles.imageSaved} source={images.bookMarkActive} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardBookmark;

const styles = StyleSheet.create({
  imageBook: {
    width: widthPercentageToDP(18),
    height: heightPercentageToDP(12),
    borderRadius: 10,
    resizeMode: 'contain',
  },
  imageSaved: {
    width: widthPercentageToDP(6),
    height: heightPercentageToDP(3),
    borderRadius: 10,
    resizeMode: 'contain',
  },
  textTitle: {
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    fontSize: 16,
  },
  textAuthor: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: 13,
  },
});
