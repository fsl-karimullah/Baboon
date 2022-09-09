import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black} from '../../resource/colors';
import CardBookmark from '../../components/card/CardBookmark';

const BookmarkScreen = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView>
        <CardBookmark
          title="Laskar Pelangi"
          author="Amir Faisal K"
          imgSrc={{
            uri: 'https://picsum.photos/200',
          }}
        />
        <CardBookmark
          title="Laskar Pelangi"
          author="Amir Faisal K"
          imgSrc={{
            uri: 'https://picsum.photos/200',
          }}
        />
        <CardBookmark
          title="Laskar Pelangi"
          author="Amir Faisal K"
          imgSrc={{
            uri: 'https://picsum.photos/200',
          }}
        />
        <CardBookmark
          title="Laskar Pelangi"
          author="Amir Faisal K"
          imgSrc={{
            uri: 'https://picsum.photos/200',
          }}
        />
        <CardBookmark
          title="Laskar Pelangi"
          author="Amir Faisal K"
          imgSrc={{
            uri: 'https://picsum.photos/200',
          }}
        />
        <CardBookmark
          title="Laskar Pelangi"
          author="Amir Faisal K"
          imgSrc={{
            uri: 'https://picsum.photos/200',
          }}
        />
      </ScrollView>
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  imageBook: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(15),
    borderRadius: 10,
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
