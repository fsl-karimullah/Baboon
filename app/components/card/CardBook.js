import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import images from '../../resource/images';
import {useTailwind} from 'tailwind-rn';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black} from '../../resource/colors';
const CardBook = ({titleBook, author, lang, pages, imageSrc, onPress}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('bg-gray-100 mx-5 my-2 rounded py-3')}>
      <TouchableOpacity style={tailwind('flex-row mx-4')} onPress={onPress}>
        <Image style={[tailwind(''), styles.imageIcon]} source={imageSrc} />
        <View style={tailwind('mx-4')}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.textTitle}>
            {titleBook}
          </Text>
          <Text style={styles.textAuthor}>{author}</Text>
          <Text style={styles.textAuthor}>{lang}</Text>
          <Text style={styles.textAuthor}>{pages}</Text>
          <View style={tailwind('flex-row mt-3')}>
            <Image
              style={[tailwind(''), styles.imageIconPdf]}
              source={images.pdfIcon}
            />
            <Text style={[tailwind('self-center'), styles.textTitle2]}>
              PDF
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardBook;

const styles = StyleSheet.create({
  imageIcon: {
    width: widthPercentageToDP(25),
    height: widthPercentageToDP(35),
    borderRadius: 10,
    resizeMode: 'contain',
  },
  textTitle: {
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    fontSize: 13,
    width: widthPercentageToDP(50),
  },
  textAuthor: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: 10,
    marginTop: 4,
  },
  imageIconPdf: {
    width: widthPercentageToDP(6),
    height: heightPercentageToDP(3),
    marginRight: 5,
    resizeMode: 'contain',
  },
  textTitle2: {
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    fontSize: 11,
  },
});
