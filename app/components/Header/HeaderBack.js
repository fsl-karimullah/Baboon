import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {black, blue_primary, gray, gray_primary} from '../../resource/colors';
import {FONT_PRIMARY_BOLD} from '../../resource/style';

const HeaderBack = ({title, customStyleContainer, onPress}) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView>
      <View
        style={[
          Platform.OS === 'ios'
            ? styles.headerContainer
            : styles.headerContainerAndroid,
          customStyleContainer,
        ]}>
        <TouchableOpacity
          style={[tailwind(''), styles.containerImageBack]}
          onPress={onPress}>
          <Image
            style={styles.imageBack}
            source={require('../../assets/images/Header/left-arrow.png')}
          />
        </TouchableOpacity>
        <Text style={[tailwind('text-center text-white'), styles.textTitle]}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    paddingVertical: 25,
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    backgroundColor: blue_primary,
  },
  headerContainerAndroid: {
    padding: 10,
    paddingVertical: 25,
    elevation: 3,
    backgroundColor: blue_primary,
  },
  textTitle: {
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: 20,

    textAlign: 'center',
  },
  imageBack: {
    width: 20,
    height: 20,
    position: 'absolute',
    margin: 2,
    tintColor: 'white',
  },
  containerImageBack: {
    zIndex: 1,
  },
});
