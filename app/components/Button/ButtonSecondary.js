import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import images from '../../resource/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {blue_primary} from '../../resource/colors';
const ButtonSecondary = ({
  title,
  onPress,
  subTitle = '',
  imageLeft,
  imageRight = images.arrow_right_grey,
  customStyleText,
  desc,
  customStyleImgLeft,
}) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={tailwind(
          'border-2 border-gray-300 p-2 mx-4 rounded-lg flex-row  items-center bg-white	',
        )}
        onPress={onPress}>
        <Image
          source={imageLeft}
          style={[
            {
              width: wp('7%'),
              height: hp('3.5%'),
              marginRight: 10,
              alignSelf: 'center',
            },
            customStyleImgLeft,
          ]}
        />
        <Text style={[tailwind('font-bold self-center'), customStyleText]}>
          {title}
        </Text>
        <Text style={[tailwind('text-lg'), customStyleText]}>{desc}</Text>
        <Image
          source={imageRight}
          style={[
            {
              width: wp('3.5%'),
              height: hp('3.5%'),
              position: 'absolute',
              right: 20,
              resizeMode: 'contain',
            },
          ]}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ButtonSecondary;
