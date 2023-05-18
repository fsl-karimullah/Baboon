import {
  Alert,
  Image,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import images from '../../resource/images';
import {useTailwind} from 'tailwind-rn';
import {FONT_PRIMARY_BOLD, FONT_PRIMARY_REGULAR} from '../../resource/style';
import {black, blue_primary} from '../../resource/colors';
import InputCustom from '../../components/InputCustom';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {useRef, useState} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {useEffect} from 'react'; 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from "react-native-modal";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { saveUserData,resetUserData } from '../../redux/actions/userRegisterAction';
import axios from 'axios';
import { endpoint } from '../../api/apiService';
import { showErrorToast, showSuccessToast } from '../../resource/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = ({userData, navigation,saveUserData}) => {
  const tailwind = useTailwind();
  const [isVisible, setisVisible] = useState(false)
  const [isSubscribe, setisSubscribe] = useState(true);
  const [Name, setName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [instance, setInstance] = useState()
  useEffect(() => {
    console.log('====================================');
    console.log(userData);
    console.log('===================================='); 
  }, []);

  const [filePath, setFilePath] = useState({});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response.assets);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets);
    });
  };
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const formData = new FormData();
const onPressEdit = async () => {
  const token = await AsyncStorage.getItem('@token');
 formData.append('avatar', {
                     uri: filePath.uri,
                     type:filePath.type, 
                     name:filePath.fileName,
                  });
  formData.append('email', email);
  formData.append('instance', instance);
  formData.append('phone_number', phoneNumber);
  formData.append('name', Name);
      axios
        .put(endpoint.editProfile, {
         data:formData
        },{ 
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(async function (response) { 
          console.log('Edit RESPONSE', response.data.data);
          saveUserData({
            name: response.data.data.name,
            email: response.data.data.email,
            phoneNum: response.data.data.phone_number,
            instance: response.data.data.instance,
            avatar: response.data.data.avatar,
            is_subscribed: response.data.data.is_subscribed,
          });
          showSuccessToast('Edit Profile Berhasil');
        })
        .catch(function (error) {
          console.log(error.request._response);
          showErrorToast("Terjadi Kesalahan. Silahkan Coba Lagi Nanti");
        });
    
}
const createTwoButtonAlert = () =>
  Alert.alert('Perhatian', 'Anda Yakin Ingin Keluar ?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress:  logoutFunction},
  ]);
const logoutFunction = async () => {
  const token = await AsyncStorage.getItem('@token');
      axios
        .post(endpoint.logout,{},{  
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }) 
        .then(async function (response) { 
          AsyncStorage.removeItem('@token');
          showSuccessToast('Logout Berhasil');
          navigation.navigate('Login')
        })
        .catch(function (error) {
          console.log(error.request._response);
          showErrorToast("Terjadi Kesalahan. Silahkan Coba Lagi Nanti");
        });
    
}
const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}, []);
  return (
    <View style={tailwind('flex-1 bg-white p-5 mt-5')}>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={tailwind('')} showsVerticalScrollIndicator={false}>
        <View style={tailwind('items-center flex m-5 ')}>
          <View style={tailwind('mb-2')}>
              <Image source={{uri: filePath.uri}} style={styles.userAvatar} />
              <TouchableOpacity style={tailwind('bg-gray-100 p-5 rounded-full')} onPress={() => setisVisible(!isVisible)}>
              <Image source={{uri: userData.avatar}} style={styles.userAvatar} />
              </TouchableOpacity>
          </View>
          <View style={tailwind('flex-row')}>
            <Text style={[tailwind(''), styles.textTitle]}>
              {userData.name}
            </Text> 
            {userData.is_subscribed ? (
              <View style={tailwind('self-center')}>
                {/* <Image 
                  source={images.logoSecond}
                  style={[tailwind('self-center'), styles.imageLogoSubs]}
                /> */}
                <Text style={[tailwind(''), styles.textPremium]}>
              {" "}(Premium)
            </Text>
              </View>
            ) : null} 
          </View>
          <Text style={[tailwind(), styles.text]}>{userData.email}</Text>
        </View>
        <InputCustom
          title="Name"
          defaultValue={userData.name} 
          placeholder={'Name'}
          onchangeText={text => setName(text)}
        />
        <InputCustom 
          title="Email"
          defaultValue={userData.email} 
          placeholder={'Email'}
          onchangeText={text => setEmail(text)}
        />
        <InputCustom
          title="No phone"
          defaultValue={userData.phoneNum}
          placeholder={'No Phone'}
          onchangeText={text => setPhoneNumber(text)}
        />
        
        <InputCustom
          title="Instance (Asal Kampus)"
          defaultValue={userData.instance}
          placeholder={'Instance'}
          onchangeText={text => setPhoneNumber(text)}
        /> 
        <View style={tailwind('mb-5')}>
          <Text style={styles.text}>
            Anda bisa langsung mengubah atau mengisikan data baru ke dalam form,
            setelah itu klik save untuk mengedit data profile anda
          </Text>
        </View>

        {/* <View style={tailwind('my-2 mx-2')}>
          <ButtonPrimary title="Save" onPress={onPressEdit} />
        </View> */}

        {userData.is_subscribed === false ? <View style={tailwind('my-2 mx-2')}>
          <ButtonPrimary title="Berlangganan" onPress={() => navigation.navigate('SubscribeScreen')} />
        </View> : "" } 
        <View style={tailwind('my-2 mx-2')}>
          <ButtonPrimary title="Logout" onPress={createTwoButtonAlert} />
        </View> 
        <View style={tailwind('my-5')}> 
          <Text style={styles.text}> 
            Berlangganan untuk mendapatkan akses penuh ketika membaca buku
            digital.
          </Text> 
        </View>
     
      </ScrollView>
      <View>
      <Modal isVisible={isVisible}>
        <View style={tailwind('bg-white p-5')}>
          <Text style={[tailwind('text-center'), styles.textTitle]}>Pilih Opsi Dibawah</Text>
          <View style={tailwind('flex-row justify-around m-4')}>
            <Pressable onPress={() => captureImage('photo')}>
            <Image source={images.cameraIcon} style={styles.userAvatar} />
            </Pressable>
           <Pressable onPress={() => chooseFile('photo')}>
           <Image source={images.galleryIcon} style={styles.userAvatar} />
           </Pressable>
          </View>
          <Pressable onPress={() => setisVisible(false)}>
        <Text style={[tailwind('text-center '), styles.textTitle]}>Batal</Text>
        </Pressable>
        </View>
       
      </Modal>
    </View>
    </View>
  );
};

const mapDispatchToProps = {
  saveUserData
};

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
  textPremium: {
    fontSize: widthPercentageToDP(4),
    fontFamily: FONT_PRIMARY_BOLD,
    color: blue_primary,
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
