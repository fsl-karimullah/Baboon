import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useTailwind} from 'tailwind-rn';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../resource/style';

const InputCustom = ({
  placeholder,
  title,
  customStyleInput,
  onchangeText,
  value,
  isSecureTextEntry,
  isIconRight,
  onPressIconRight,
  imageIconRight,
  customStyleIconContainer,
  customStyleIcon,
  customStyleInputContainer,
  isError = false,
  errorMessage,
  keyboardType,
  autoCapitalize,
  defaultValue,
  onChange,
  onEndEditing
}) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind('')}>
      <View style={tailwind('my-5')}>
        <Text style={styles.titleInput}>{title}</Text>
        <View
          style={[tailwind('flex justify-center'), customStyleInputContainer]}>
          <TextInput
            style={[styles.input, customStyleInput]}
            onChangeText={onchangeText}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={isSecureTextEntry}
            autoCapitalize={autoCapitalize}
            defaultValue={defaultValue}
            onEndEditing={onEndEditing}
          />
          {isIconRight ? (
            <TouchableOpacity
              onPress={onPressIconRight}
              style={[
                tailwind(''),
                styles.iconRightContainer,
                customStyleIconContainer,
              ]}>
              <Image
                source={imageIconRight}
                style={[tailwind(''), styles.iconRight, customStyleIcon]}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {isError ? <Text style={styles.errorInput}>{errorMessage}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconLogin: {
    width: widthPercentageToDP('30%'),
    height: widthPercentageToDP('30%'),
  },
  textTitle: {
    fontSize: widthPercentageToDP('5%'),
    marginTop: widthPercentageToDP('5%'),
    fontFamily: FONT_PRIMARY_BOLD,
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  titleInput: {
    fontSize: widthPercentageToDP('3%'),
    color: 'black',
    fontFamily: FONT_PRIMARY_BOLD,
  },
  iconRight: {
    width: widthPercentageToDP('5%'),
    height: widthPercentageToDP('5%'),
  },
  iconRightContainer: {
    position: 'absolute',
    right: 0,
  },
  errorInput: {
    color: 'red',
    fontSize: widthPercentageToDP('3%'),
    marginTop: 5,
  },
});
export default InputCustom;
