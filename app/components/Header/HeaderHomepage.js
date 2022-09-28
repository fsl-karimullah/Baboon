import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {black, blue_primary} from '../../resource/colors';
import {FONT_PRIMARY_BOLD} from '../../resource/style';

const HeaderHomepage = ({title, customStyleContainer, onPress}) => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView>
      <View
        style={[
          Platform.OS === 'ios'
            ? styles.headerContainerIos
            : styles.headerContainer,
          customStyleContainer,
        ]}>
        <Text
          style={[
            tailwind('text-center text-white flex self-center'),
            styles.textTitle,
          ]}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={tailwind('self-center rounded-full bg-black p-2')}>
          <Image
            style={[tailwind(''), styles.imageUser]}
            source={require('../../assets/images/Header/account.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HeaderHomepage;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 35 : 45,
    paddingBottom: 10,
    elevation: 2,
  },
  headerContainerIos: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 35 : 45,
    paddingBottom: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  textTitle: {
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: 18,
    color: black,
  },
  imageUser: {
    width: 20,
    height: 20,
  },
});
