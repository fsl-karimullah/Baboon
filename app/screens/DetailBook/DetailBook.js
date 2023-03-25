import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {endpoint} from '../../api/apiService';
import {saveBookDetail} from '../../redux/actions/getBookAction';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const DetailBook = ({route, navigation, saveBookDetail, bookDataDdetail}) => {
  const tailwind = useTailwind();
  const [isLoading, setisLoading] = useState(false);
  const {id} = route.params;
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');

    await axios
      .get(`http://10.0.2.2:8000/api/books/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        console.log('TESTTTTTTT', response);
        saveBookDetail(response.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView>
        <View style={tailwind('self-center mt-5')}>
          <Image
            source={{
              uri: bookDataDdetail.data.thumbnail,
            }}
            style={styles.imageBook}
          />
          <View style={tailwind('my-3 mx-5')}>
            <Text style={[tailwind('text-center'), styles.textTitle]}>
              {bookDataDdetail.data.title}
            </Text>
            <Text style={[tailwind('text-center'), styles.textAuthor]}>
              {bookDataDdetail.data.authors}
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
                {bookDataDdetail.data.pageCount}
              </Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View>
              <Text style={styles.textTitle2}>Published Date</Text>
              <Text style={[styles.textAuthor, tailwind('text-center pt-2')]}>
                {bookDataDdetail.data.publishedDate}
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
          {/* <View style={tailwind('my-4')}>
            <Text style={[tailwind(''), styles.textTitle]}>Tentang Author</Text>
            <Text style={[tailwind(), styles.textDesc]}>
              Laborum aute aliquip sit est duis adipisicing sit ex veniam culpa.
              Ea sint id elit ullamco. Nostrud mollit qui ad amet. Duis anim ut
              nulla officia ullamco dolor nostrud do adipisicing. Do nisi ut id
              sit voluptate reprehenderit amet dolore sit proident dolor ea.
              Cillum nisi eu magna ullamco labore ut.
            </Text>
          </View> */}
          <View>
            <Text style={[tailwind(''), styles.textTitle]}>Deskripsi Buku</Text>
            <Text style={[tailwind(), styles.textDesc]}>
              {bookDataDdetail.data.description}
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

const mapDispatchToProps = {
  saveBookDetail,
};

const mapStateToProps = state => {
  return {
    bookDataDdetail: state.bookData.dataDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBook);

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
    textAlign: 'center',
  },
  textAuthor: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: widthPercentageToDP(3),
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
