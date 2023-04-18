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
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {useEffect} from 'react';

const Profile = ({userData, navigation}) => {
  const tailwind = useTailwind();
  const [isSubscribe, setisSubscribe] = useState(true);
  useEffect(() => {
    console.log('====================================');
    console.log(userData);
    console.log('====================================');
  }, []);

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
              {userData.name}
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
          <Text style={[tailwind(), styles.text]}>{userData.email}</Text>
        </View>

        <InputCustom
          title="Email"
          value={userData.email} 
          placeholder={'Email'}
        />
        {/* <InputCustom
          title="Password"
          value={user}
          isSecureTextEntry={true}
          placeholder={'Password'}
          isIconRight={true}
          imageIconRight={images.loupeGray}
        /> */}
        <InputCustom
          title="No phone"
          value={userData.phoneNum}
          placeholder={'No Phone'}
        />
        <InputCustom
          title="Instance (Asal Kampus)"
          value={userData.instance}
          placeholder={'Instance'}
        /> 
        <View style={tailwind('mb-5')}>
          <Text style={styles.text}>
            Anda bisa langsung mengubah atau mengisikan data baru ke dalam form,
            setelah itu klik save untuk mengedit data profile anda
          </Text>
        </View>

        <View style={tailwind('my-2 mx-2')}>
          <ButtonPrimary title="Save" />
        </View>

        <View style={tailwind('mt-2 mx-2')}>
          <ButtonPrimary title="Berlangganan" onPress={() => navigation.navigate('SubscribeScreen')} />
        </View>
        <View style={tailwind('my-5')}>
          <Text style={styles.text}>
            Berlangganan untuk mendapatkan akses penuh ketika membaca buku
            digital.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    userData: state.userData.data,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  userAvatar: {
    width: 60,
    height: 60,
  },
  textTitle: {
    fontSize: widthPercentageToDP(4),
    fontFamily: FONT_PRIMARY_BOLD,
    color: black,
  },
  text: {
    fontSize: widthPercentageToDP(3),
    fontFamily: FONT_PRIMARY_REGULAR,
    color:black
  },
  imageLogoSubs: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});
