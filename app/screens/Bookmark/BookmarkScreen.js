import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React,{useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black} from '../../resource/colors';
import CardBookmark from '../../components/card/CardBookmark';
import axios from 'axios';
import { endpoint } from '../../api/apiService';
import {saveBookmarkData} from '../../redux/actions/getBookmarkAction'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../resource/images';
import EmptyComponent from '../../components/EmptyComponent';
const BookmarkScreen = ({saveBookmarkData, bookmarkData, navigation}) => {
  const tailwind = useTailwind();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("THUMB", bookmarkData); 
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  //api/bookmarks
  useEffect(() => {
    console.log("THUMB", bookmarkData); 
    getData();
  }, []);
  const getData = async () => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');

    await axios
      .get(endpoint.getBookmark, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        console.log('TESTTTTTTT', response.data.data);
        saveBookmarkData(response.data.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteBookmark = async () => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('@token');

    await axios
      .get(endpoint.getBookmark, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        
        saveBookmarkData(response.data.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <FlatList 
                initialNumToRender={10}
                onRefresh={onRefresh}
                refreshing={refreshing} 
                data={Object.values(bookmarkData)} 
                ListEmptyComponent={<EmptyComponent title={'Anda belum menambahkan buku ke favorit'} />}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={tailwind('')}>
                    <CardBookmark
                      customStyleContainer={tailwind('my-3 ')}
                      title={item.title || 'No Title'} 
                      onPress={() =>
                        navigation.push('DetailBook', { 
                          id: item.book_id,
                          bookmarkId:item.id
                        }) 
                      }
                      author={item.authors ? item.authors[0] : 'No Author'}
                      imgSrc={
                          item.thumbnail  || item.thumbnail === '' ? images.noImage : {uri: item.thumbnail}   
                      } 
                    /> 
                  </View> 
                )}
              /> 
    </View>
  );
};

const mapDispatchToProps = {
  saveBookmarkData,
};

const mapStateToProps = state => {
  return {
    bookmarkData: state.bookmarkData.data,
    userData: state.userData.data,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookmarkScreen);
const styles = StyleSheet.create({
  imageBook: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(15),
    borderRadius: 10,
  },
  textTitle: {
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
    fontSize: widthPercentageToDP(4),
  },
  textAuthor: {
    fontFamily: FONT_PRIMARY_REGULAR,
    fontSize: widthPercentageToDP(3.5),
  },
});
