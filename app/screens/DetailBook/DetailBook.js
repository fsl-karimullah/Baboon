import { Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import HeaderBack from '../../components/Header/HeaderBack';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR } from '../../resource/style';
import {
  black,
  gray,
  gray_100,
  gray_primary,
  white,
} from '../../resource/colors';


import ButtonPrimary from '../../components/Button/ButtonPrimary';
import { endpoint } from '../../api/apiService';
import { saveBookDetail } from '../../redux/actions/getBookAction';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import images from '../../resource/images';
import { saveBookmarkData } from '../../redux/actions/getBookmarkAction';
import { showErrorToast, showSuccessToast } from '../../resource/Helper';


const DetailBook = ({ route, navigation, saveBookDetail, bookDataDetail, userData ,bookmarkData}) => {
  const tailwind = useTailwind();
  const [isLoading, setisLoading] = useState(false);
  const { id } = route.params;
  

  useEffect(() => {
    console.log("+++++++", bookmarkData);
    getData(); 
  }, []); 
//api/books/2/bookmark //bookmark a book

  const getData = async () => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');

    console.log(id)

    await axios
      .get(`http://127.0.0.1:8000/api/books/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        console.log('TESTTTTTTT', response.data.data);
        saveBookDetail(response.data.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const bookMark = async () => {
    setisLoading(true);
    
    const token = await AsyncStorage.getItem('@token'); 
    await axios 
      .post(`http://127.0.0.1:8000/api/books/${id}/bookmark`,{}, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json' 
        },
      })
      .then(function (response) {
        saveBookmarkData(response.data.data);
        showSuccessToast('Buku Telah Ditambahkan Ke Bookmark');
        setisLoading(false);
        
      })
      .catch(function (error) {
        console.log(error);
        showErrorToast('Buku Telah Di Bookmark');
      });
  };
  const removeBookmark = async () => {
    setisLoading(true);
    
    const token = await AsyncStorage.getItem('@token'); 
    await axios 
      .delete(endpoint.deleteBookmark + id, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json' 
        },
      })
      .then(function (response) {
        saveBookmarkData(response.data.data);
        showSuccessToast('Buku Telah Berhasil Dihapus Dari Bookmark');
        setisLoading(false);
        
      }) 
      .catch(function (error) {
        console.log(error);
        showErrorToast('Buku Telah Di Hilangkan Dari Bookmark');
      });
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        <View style={tailwind('self-center mt-5')}>
          <Image
            source={bookDataDetail.thumbnail === 'http://127.0.0.1:8000/storage/test' ? images.noImage : { uri: bookDataDetail.thumbnail }}
            style={styles.imageBook}
          />
          <View style={tailwind('my-3 mx-5')}>
            <Text style={[tailwind('text-center'), styles.textTitle]}>
              {bookDataDetail.title}
            </Text>
            <Text style={[tailwind('text-center'), styles.textTitle3]}>
              By {bookDataDetail.authors}
            </Text>
            <Text style={[tailwind('text-center'), styles.textISBN]}>
              {bookDataDetail.isbn}
            </Text>
          </View>
          <View
            style={[
              tailwind('flex-row justify-around py-2 px-3 border-gray-200'),
              styles.containerDetail,
            ]}>
            <View>
              <Text style={styles.textTitle2}>Pages</Text>
              <Text style={[styles.textSubTitle, tailwind('pt-2 text-center')]}>
                {bookDataDetail.pageCount}
              </Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View>
              <Text style={styles.textTitle2}>Published Date</Text>
              <Text style={[styles.textSubTitle, tailwind(' pt-2 text-center')]}>
                {bookDataDetail.publishedDate}
              </Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View>
              <Text style={styles.textTitle2}>Category</Text>
              <Text style={[styles.textSubTitle, tailwind(' pt-2 text-center')]}>
                {/* {bookDataDetail.publisher} Bin Amir Faisal Karimullah */}
                {bookDataDetail.category}
              </Text>
            </View>

          </View>
        </View>
        <View style={tailwind('m-5')}>
          <View>
            {userData.is_subscribed === false ? (<View style={tailwind('my-4')}>
              <Text
                style={[
                  tailwind('text-center p-3 bg-red-300 text-white rounded'),
                  styles.textWarning,
                ]}>
                Anda Belum berlangganan 
              </Text>
            </View>) : (<View style={tailwind('my-4')}>
              <Text
                style={[
                  tailwind('text-center p-3 bg-green-300 text-white rounded'),
                  styles.textWarning,
                ]}>
                Anda Sudah berlangganan
              </Text>
            </View>)}
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
              {bookDataDetail.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={tailwind('py-2 flex-row self-center')}>
        <View style={tailwind('mx-4')}>
          <ButtonPrimary customTextTitle={{ fontSize: 13 }} title={bookDataDetail.is_bookmarked ? 'Remove Bookmark' : "Add to Bookmark" } onPress={bookDataDetail.is_bookmarked ? removeBookmark : bookMark} />
        </View>
        <View style={tailwind('mx-4')}>
          <ButtonPrimary
            onPress={() => navigation.navigate('PdfScreen', userData.is_subscribed === false ? { uri: bookDataDetail.pdf_full } : { uri: bookDataDetail.pdf_preview })}
            customStyleContainer={{
              backgroundColor: black, 
            }} 
            customTextTitle={{ fontSize: 13 }} 
            title="Baca Online"
          />
        </View>
      </View>
     
    </View>
  );
};

const mapDispatchToProps = {
  saveBookDetail,
  saveBookmarkData
};

const mapStateToProps = state => {
  return {
    bookDataDetail: state.bookData.dataDetail,
    userData: state.userData.data,
    bookmarkData :state.bookmarkData.data
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
  textTitle3: {
    fontFamily: FONT_PRIMARY_REGULAR,
    color: black,
    fontSize: widthPercentageToDP(3.5),
    textAlign: 'center',
  },
  textAuthor: {
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: widthPercentageToDP(3),
  },
  textISBN: {
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: widthPercentageToDP(3),
  },
  textCategory: {
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: widthPercentageToDP(3),
  },
  textDesc: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: widthPercentageToDP(2.5),
    textAlign: 'justify',
  },
  textSubTitle: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: widthPercentageToDP(3),
    textAlign: 'center',

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
