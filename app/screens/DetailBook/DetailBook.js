import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import HeaderBack from '../../components/Header/HeaderBack';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {
  black,
  gray,
  gray_100,
  gray_primary,
  white,
} from '../../resource/colors';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
const DetailBook = ({route, navigation}) => {
  const tailwind = useTailwind();
  const {uri, title, author, img} = route.params;
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView>
        <View style={tailwind('self-center mt-5')}>
          <Image
            source={{
              uri: img,
            }}
            style={styles.imageBook}
          />
          <View style={tailwind('my-3 mx-5')}>
            <Text style={[tailwind('text-center'), styles.textTitle]}>
              {title}
            </Text>
            <Text style={[tailwind('text-center'), styles.textAuthor]}>
              {author}
            </Text>
          </View>
          <View
            style={[
              tailwind('flex-row justify-around py-2 px-3 border-gray-200'),
              styles.containerDetail,
            ]}>
            <View>
              <Text style={styles.textTitle2}>Pages</Text>
              <Text style={[styles.textAuthor, tailwind('text-center pt-2')]}>
                90
              </Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View>
              <Text style={styles.textTitle2}>Year</Text>
              <Text style={[styles.textAuthor, tailwind('text-center pt-2')]}>
                2020
              </Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View>
              <Text style={styles.textTitle2}>Language</Text>
              <Text style={[styles.textAuthor, tailwind('text-center pt-2')]}>
                Indonesia
              </Text>
            </View>
          </View>
        </View>
        <View style={tailwind('m-5')}>
          <View style={tailwind('my-4')}>
            <Text
              style={[
                tailwind('text-center p-3 bg-red-300 text-white rounded'),
                styles.textWarning,
              ]}>
              Anda belum berlangganan
            </Text>
          </View>
          <View style={tailwind('my-4')}>
            <Text style={[tailwind(''), styles.textTitle]}>Tentang Author</Text>
            <Text style={[tailwind(), styles.textDesc]}>
              Laborum aute aliquip sit est duis adipisicing sit ex veniam culpa.
              Ea sint id elit ullamco. Nostrud mollit qui ad amet. Duis anim ut
              nulla officia ullamco dolor nostrud do adipisicing. Do nisi ut id
              sit voluptate reprehenderit amet dolore sit proident dolor ea.
              Cillum nisi eu magna ullamco labore ut.
            </Text>
          </View>
          <View>
            <Text style={[tailwind(''), styles.textTitle]}>Sinopsis</Text>
            <Text style={[tailwind(), styles.textDesc]}>
              Est nostrud non et anim reprehenderit. Ad tempor reprehenderit
              amet aute amet Lorem veniam cillum sit. Eiusmod fugiat dolore
              ullamco nulla tempor veniam sunt et id. Laborum consequat ea
              ullamco mollit adipisicing. Ex qui consequat aliquip irure commodo
              deserunt anim. Incididunt in ut fugiat cupidatat eu esse qui in.
              Dolore proident veniam dolor voluptate ut. Do tempor duis commodo
              sunt nulla eu consequat amet labore esse quis culpa officia
              eiusmod. Ullamco non qui sunt duis fugiat qui est laboris nisi. Id
              eu sint elit laboris adipisicing ad quis. Sunt quis deserunt
              aliquip magna et ullamco laboris magna Lorem id nulla. Sit non
              cupidatat sint in velit aliqua voluptate proident labore fugiat
              irure excepteur. Laborum culpa eu exercitation est ipsum
              reprehenderit velit deserunt tempor. Tempor non enim in cupidatat
              Lorem nisi eu officia eu et ut excepteur. Elit ex non tempor sunt.
              Et et fugiat duis consequat mollit aute commodo fugiat commodo
              consectetur nostrud id. Aute dolore et non proident consectetur.
              Velit sit ex veniam labore ut et proident irure sit commodo non.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={tailwind('py-2 flex-row self-center')}>
        <View style={tailwind('mx-4')}>
          <ButtonPrimary customTextTitle={{fontSize: 13}} title="Bookmark" />
        </View>
        <View style={tailwind('mx-4')}>
          <ButtonPrimary
            onPress={() => navigation.navigate('WebViewScreen', {uri: uri})}
            customStyleContainer={{
              backgroundColor: black,
            }}
            customTextTitle={{fontSize: 13}}
            title="Baca Online"
          />
        </View>
      </View>
    </View>
  );
};

export default DetailBook;

const styles = StyleSheet.create({
  imageBook: {
    width: widthPercentageToDP(50),
    height: heightPercentageToDP(35),
    borderRadius: 10,
    alignSelf: 'center',
  },
  textTitle: {
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    fontSize: widthPercentageToDP(4),
  },
  textWarning: {
    fontFamily: FONT_PRIMARY_BOLD,
    color: white,
    fontSize: widthPercentageToDP(3),
  },
  textTitle2: {
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    fontSize: widthPercentageToDP(4),
  },
  textAuthor: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: widthPercentageToDP(2.5),
  },
  textDesc: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: widthPercentageToDP(2.5),
    textAlign: 'justify',
  },
  containerDetail: {
    borderWidth: 1,
    borderRadius: 10,
    width: widthPercentageToDP(80),
    alignSelf: 'center',
  },
  verticleLine: {
    height: '85%',
    width: 1,
    backgroundColor: gray_100,
    alignSelf: 'center',
  },
});
