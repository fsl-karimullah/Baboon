import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Linking,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderHomepage from '../../components/Header/HeaderHomepage';
import { black, gray } from '../../resource/colors';
import { FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR } from '../../resource/style';
import { useTailwind } from 'tailwind-rn';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import InputCustom from '../../components/InputCustom';
import images from '../../resource/images';
import { endpoint } from '../../api/apiService';
import { connect } from 'react-redux';
import { saveBookData, saveBookDetail } from '../../redux/actions/getBookAction';
import Shimmer from 'react-native-shimmer';
import Card from '../../components/card/Card';
import TitleButton from '../../components/Button/TitleButton';
import axios from 'axios';
import { saveUserData } from '../../redux/actions/userRegisterAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyComponent from '../../components/EmptyComponent';
import { saveCategoryData } from '../../redux/actions/getCategoryAction'
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Homepage = ({
  navigation,
  saveBookData,
  saveBookDetail,
  bookData,
  userData,
  saveUserData,
  saveCategoryData,
  categoryData
}) => { 
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [numColumn, setNumColumn] = useState(2);
  const [page, setpage] = useState(1)
  const [categoryId, setcategoryId] = useState()
  const [searchBar, setsearchBar] = useState()
  const tailwind = useTailwind();


  useEffect(() => {
    if (page == 1) {
      getCategory()
    }
    getData();
    const backAction = () => {
      Alert.alert('Perhatian', 'Apakah anda yakin akan keluar ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [page]);
  

  const getData = async () => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');

    await axios
      .get(endpoint.getMoreBook + page, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        let books = bookData.data
        if (page > 1) {
          response.data.data.forEach(element => {
            books.push(element)
          });
          let objects = bookData
          objects.data = books
          objects.links = response.data.links.next == null ? false : response.data.links.next
          saveBookData(objects);
          setisLoading(false);
        } else {
          saveBookData(response.data)
          setisLoading(false);
        }
      })
      .catch(function (error) {
      });
  };


  const getSearchData = async (searchBar) => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');
    await axios
      .get(endpoint.searchBook + searchBar, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        saveBookData(response.data);
        setisLoading(false);
      })
      .catch(function (error) {
      });
  };
  const getByCategory = async (category_id) => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');

    await axios
      .get(endpoint.searchBookByCategory + category_id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        saveBookData(response.data);
        setisLoading(false);
      })
      .catch(function (error) {
      });
  };
  const getCategory = async () => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');

    await axios
      .get(endpoint.selectCategory, {
        headers: {
          Authorization: 'Bearer ' + token,

        },
      })
      .then(function (response) {
        saveCategoryData(response.data.data);
        setisLoading(false);
      })
      .catch(function (error) {
      });
  };


  const getMoreData = (bookData) => {
  console.log('TEST')
  console.log(bookData.links)
    if (bookData.links.next) {
      setpage(page + 1)
    }
  };

  const onRefresh = async () => {
    setpage(1)
    setRefreshing(true);
    setRefreshing(false);
    getData()
  }

  const bottomLoader = () => {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'#000'} />
      </View>
    )
  }
  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <HeaderHomepage
        title={'Homepage'}
        onPress={() => navigation.navigate('Profile')}
      />
      <View style={tailwind('m-5')}>
        {isLoading ? (
          <Shimmer>
            <View style={tailwind('my-5')}>
              <FlatList
                data={bookData.data}
                numColumns={numColumn}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Card titleBook={''} author={''} />
                )}
              />
            </View>
          </Shimmer>
        ) : (
          <View style={tailwind('mt-3 pb-16')}>
            <FlatList
              numColumns={numColumn} 
             
              ListHeaderComponent={() => (
                <View>
                  <View>
                    <Text style={[tailwind(''), styles.text]}>
                      Welcome Back, {userData.name} !
                    </Text>
                    <Text style={[tailwind(''), styles.textTitle]}>
                      What do you want to read today?
                    </Text>
                  </View>
                  <View>
                    <InputCustom
                      placeholder={'Search'}
                      isIconRight={true}
                      onPressIconRight={() => getSearchData(searchBar)}
                      imageIconRight={images.loupeGray}
                      value={searchBar}
                      onchangeText={searchBar => setsearchBar(searchBar)}
                      customStyleInput={{
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        backgroundColor: '#eee',
                        borderBottomWidth: 0,
                      }}
                      customStyleIconContainer={{
                        right: 10,
                      }}
                    />
                  </View>

                  <View style={tailwind('mb-10')}>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      onRefresh={refreshing}
                      data={categoryData}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => getByCategory(item.id)}
                          style={[tailwind('flex flex-row flex-wrap mr-5 mb-2')]}>
                          <View>
                            <Text style={styles.text}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                  <View>
                    <TitleButton
                      title="For You"
                      onPress={() => navigation.navigate('ForYouScreen')}

                    />
                  </View>
                </View>
              )}
              onEndReached={() => getMoreData(bookData)}
              refreshing={refreshing}
              onRefresh={onRefresh}
              data={bookData.data}
              ListEmptyComponent={<EmptyComponent title={'Buku yang anda cari tidak ada'} />}
              ListFooterComponent={!isLoading ? bottomLoader : null}
              keyExtractor={(item, index) => index.toString()}
              

              renderItem={({ item, index }) => (
                <View style={tailwind('flex-1 flex-row justify-evenly')}>

                  <Card 
                    customStyleContainer={tailwind('my-3 ')}
                    titleBook={item.title || 'No Title'}
                    onPress={() =>
                      navigation.navigate('DetailBook', {
                        id: item.id,
                      })
                    }
                    author={item.authors ? item.authors[0] : 'No Author'}
                    imageSrc={
                      item.thumbnail === 'http://127.0.0.1:8000/storage/test' || item.thumbnail === '' ? images.noImage : { uri: item.thumbnail }
                    }
                  /> 
                </View> 
              )} 
            />  
          </View> 
        )} 
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = {
  saveUserData,
  saveBookData,
  saveCategoryData
};
 
const mapStateToProps = state => {
  return {
    bookData: state.bookData.data,
    userData: state.userData.data, 
    categoryData: state.categoryData.data
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

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
});
