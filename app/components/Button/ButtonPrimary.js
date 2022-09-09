import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {blue_primary} from '../../resource/colors';
import {useTailwind} from 'tailwind-rn';
import {FONT_PRIMARY_BOLD} from '../../resource/style';
const ButtonPrimary = ({
  onPress,
  title,
  customTextTitle,
  customStyleContainer,
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={[tailwind(''), styles.containerButton, customStyleContainer]}
      onPress={onPress}>
      <Text style={[styles.textTitle, customTextTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: blue_primary,
    borderRadius: 5,
    padding: 15,
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONT_PRIMARY_BOLD,
    textAlign: 'center',
  },
});
