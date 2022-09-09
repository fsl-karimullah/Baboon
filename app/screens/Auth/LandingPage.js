import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import HeaderFirst from '../../components/Header/HeaderFirst';
import {useTailwind} from 'tailwind-rn';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Button/ButtonSecondary';
import images from '../../resource/images';
const LandingPage = ({navigation}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <HeaderFirst title="My Account" />
      <Text style={[tailwind('my-5 '), styles.textTitle]}>
        The best choice for your book publications
      </Text>
      <View style={tailwind('flex-row self-center')}>
        <View style={tailwind('mx-2')}>
          <ButtonPrimary
            title={'Register'}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <View style={tailwind('mx-2')}>
          <ButtonPrimary
            title={'Login'}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
      <View style={[tailwind('w-full bg-gray-300 my-5 p-0.5')]}></View>
      <View>
        <View style={tailwind('my-2')}>
          <ButtonSecondary
            title="Help Center"
            imageLeft={images.customerService}
          />
        </View>
        <View style={tailwind('my-2')}>
          <ButtonSecondary
            title="Contact Us"
            imageLeft={images.questioningHelp}
          />
        </View>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontFamily: FONT_PRIMARY_REGULAR,
  },
});
