import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import images from '../../resource/images';
import {useTailwind} from 'tailwind-rn';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black} from '../../resource/colors';
import InputCustom from '../../components/InputCustom';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {useState} from 'react';
const Profile = () => {
  const tailwind = useTailwind();
  const [isSubscribe, setisSubscribe] = useState(true);
  return (
    <View style={tailwind('flex-1 bg-white p-5 mt-5')}>
      <ScrollView style={tailwind('')} showsVerticalScrollIndicator={false}>
        <View style={tailwind('items-center flex m-5 ')}>
          <View style={tailwind('mb-2')}>
            <TouchableOpacity style={tailwind('bg-gray-100 p-5 rounded-full')}>
              <Image source={images.userImg} style={styles.userAvatar} />
            </TouchableOpacity>
          </View>
          <View style={tailwind('flex-row')}>
            <Text style={[tailwind(''), styles.textTitle]}>
              Amir Faisal Karimullah
            </Text>
            {isSubscribe ? (
              <View style={tailwind('self-center')}>
                <Image
                  source={images.logoSecond}
                  style={[tailwind('self-center'), styles.imageLogoSubs]}
                />
              </View>
            ) : null}
          </View>
          <Text style={[tailwind(), styles.text]}>faisalbic123@gmail.com</Text>
        </View>

        <InputCustom
          title="Email"
          value={'faisalbic123@gmail.com'}
          placeholder={'Email'}
        />
        <InputCustom
          title="Password"
          value={'faisalbic123'}
          isSecureTextEntry={true}
          placeholder={'Password'}
          isIconRight={true}
          imageIconRight={images.loupeGray}
        />
        <InputCustom
          title="No phone"
          value={'087826563459'}
          placeholder={'No Phone'}
        />
        <InputCustom
          title="Instance"
          value={'Politeknik Negeri Jember'}
          placeholder={'Instance'}
        />
        <View style={tailwind('mb-5')}>
          <Text style={styles.text}>
            Anda bisa langsung mengubah atau mengisikan data baru ke dalam form,
            setelah itu klik save untuk mengedit data profile anda
          </Text>
        </View>

        <ButtonPrimary title="Save" />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  userAvatar: {
    width: 60,
    height: 60,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
  },
  text: {
    fontSize: 13,
    fontFamily: FONT_PRIMARY_REGULAR,
  },
  imageLogoSubs: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});
