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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderHomepage from '../../components/Header/HeaderHomepage';
import {black, gray} from '../../resource/colors';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {useTailwind} from 'tailwind-rn';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import InputCustom from '../../components/InputCustom';
import images from '../../resource/images';
import {endpoint} from '../../api/apiService';
import {connect} from 'react-redux';
import {saveBookData, saveBookDetail} from '../../redux/actions/getBookAction';
import Shimmer from 'react-native-shimmer';
import Card from '../../components/card/Card';
import TitleButton from '../../components/Button/TitleButton';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Homepage = ({navigation, saveBookData, saveBookDetail, bookData}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [numColumn, setNumColumn] = useState(2);
  const tailwind = useTailwind();
  const [Data, setData] = useState();
  const getData = async () => {
    try {
      setisLoading(true);
      const response = await fetch(endpoint.getBook);
      const data = await response.json();
      // console.log(data.items[0].volumeInfo.title);
      // console.log(data.items[0].volumeInfo.authors[0]);
      // console.log(data.items[0].volumeInfo.description);
      // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
      saveBookData(data.items);
      console.log(
        'BOOK DATA FROM STATE',
        bookData.data[0].volumeInfo.imageLinks.thumbnail,
      );
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    getData();
  }, []);
  const [ListData, setListData] = useState([
    {
      id: 1,
      title: 'Fiksi',
      filterTo: 'fiksi',
    },
    {
      id: 2,
      title: 'Aksi',
      filterTo: 'aksi',
    },
    {
      id: 3,
      title: 'Cerita',
      filterTo: 'cerita',
    },
    {
      id: 4,
      title: 'Dongeng',
      filterTo: 'dongeng',
    },
    {
      id: 5,
      title: 'Ajaran',
      filterTo: 'ajaran',
    },
    {
      id: 6,
      title: 'Proposal',
      filterTo: 'proposal',
    },
    {
      id: 7,
      title: 'Skripsi',
      filterTo: 'skripsi',
    },
  ]);
  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <HeaderHomepage
        title={'Homepage'}
        onPress={() => navigation.navigate('Profile')}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={tailwind('m-5')}>
          <View>
            <Text style={[tailwind(''), styles.text]}>
              Welcome Back, John Doe !
            </Text>
            <Text style={[tailwind(''), styles.textTitle]}>
              What do you want to read today?
            </Text>
          </View>
          <View>
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

          <View style={tailwind('mb-10')}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={ListData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.navigationTo)}
                  style={[tailwind('flex flex-row flex-wrap mr-5 mb-2')]}>
                  <View>
                    <Text style={styles.text}>{item.title}</Text>
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
          {isLoading ? (
            <Shimmer>
              <View style={tailwind('my-5')}>
                <FlatList
                  data={bookData.data}
                  numColumns={numColumn}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <Card titleBook={''} author={''} />
                  )}
                />
              </View>
            </Shimmer>
          ) : (
            <View style={tailwind('mt-3')}>
              <FlatList
                initialNumToRender={10}
                numColumns={numColumn}
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={bookData.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={tailwind('flex-1 flex-row justify-evenly')}>
                    <Card
                      customStyleContainer={tailwind('my-3 ')}
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
                    />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = {
  saveBookData,
  saveBookDetail,
};

const mapStateToProps = state => {
  return {
    bookData: state.bookData,
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
