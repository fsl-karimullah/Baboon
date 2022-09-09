import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {blue_primary} from '../../resource/colors';
import {FONT_PRIMARY_BOLD} from '../../resource/style';

const HeaderFirst = ({title, customStyleContainer}) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView>
      <View style={[styles.headerContainer, customStyleContainer]}>
        <Text style={[tailwind('text-center text-white'), styles.textTitle]}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HeaderFirst;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: blue_primary,
    padding: 30,
  },
  textTitle: {
    fontFamily: FONT_PRIMARY_BOLD,
    fontSize: 20,
  },
});
