import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardBook from '../../components/card/CardBook';
import {useTailwind} from 'tailwind-rn';
import {endpoint} from '../../api/apiService';
import {connect} from 'react-redux';
import InputCustom from '../../components/InputCustom';
import images from '../../resource/images';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const ForYouAll = ({navigation, bookData}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const tailwind = useTailwind();
  //   const getData = async () => {
  //     try {
  //       setisLoading(true);
  //       const response = await fetch(endpoint.getBook);
  //       const data = await response.json();
  //       // console.log(data.items[0].volumeInfo.title);
  //       // console.log(data.items[0].volumeInfo.authors[0]);
  //       // console.log(data.items[0].volumeInfo.description);
  //       // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
  //       saveBookData(data.items);
  //       console.log(
  //         'BOOK DATA FROM STATE',
  //         bookData.data[0].volumeInfo.imageLinks.thumbnail,
  //       );
  //       setisLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Alert.alert('Info', 'Resfreshed');
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={tailwind('bg-white flex-1 ')}>
      <View style={tailwind('')}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={tailwind('mx-5')}>
            <InputCustom
              // title="Search"
              placeholder={'Search'}
              isIconRight={true}
              imageIconRight={images.loupeGray}
              customStyleInput={{
                borderRadius: 10,
                // borderWidth: 1,
                // borderColor: 'gray',
                paddingHorizontal: 10,
                backgroundColor: '#eee',
                borderBottomWidth: 0,
              }}
              customStyleIconContainer={{
                right: 10,
              }}
            />
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={bookData.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <CardBook
                titleBook={item.volumeInfo.title || 'No Title'}
                onPress={() =>
                  navigation.navigate('DetailBook', {
                    uri: item.volumeInfo.previewLink,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors,
                    img: 'https://picsum.photos/200',
                  })
                }
                author={
                  item.volumeInfo.authors
                    ? item.volumeInfo.authors[0]
                    : 'No Author'
                }
                imageSrc={
                  {
                    uri: 'https://picsum.photos/200',
                  } || images.noImage
                }
                lang={'Indonesia'}
                pages="100"
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    bookData: state.bookData,
  };
};
export default connect(mapStateToProps)(ForYouAll);

const styles = StyleSheet.create({});
