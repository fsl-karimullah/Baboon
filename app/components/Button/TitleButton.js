import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {black, blue_primary} from '../../resource/colors';
import {FONT_PRIMARY_BOLD} from '../../resource/style';
import {useTailwind} from 'tailwind-rn';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const TitleButton = ({title, onPress}) => {
  const tailwind = useTailwind();
  return (
    <View>
      <View style={tailwind('flex-row justify-between')}>
        <View>
          <Text style={styles.textTitleTopCard}>{title}</Text>
        </View>
        {/* <View style={tailwind('self-center')}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.textTitleButton}>See All</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default TitleButton;

const styles = StyleSheet.create({
  textTitleTopCard: {
    color: black,
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: widthPercentageToDP(5),
  },
  textTitleButton: {
    color: blue_primary,
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: widthPercentageToDP(4),
  },
});
