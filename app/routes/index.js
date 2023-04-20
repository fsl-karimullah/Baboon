import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LandingPage from '../screens/Auth/LandingPage';
import Register from '../screens/Auth/Register';
import Homepage from '../screens/Homepage/Homepage';
import {FONT_PRIMARY_BOLD} from '../resource/style';
import WebViewScreen from '../screens/WebView/WebView';
import Profile from '../screens/Profile/Profile';
import HomeLanding from '../screens/Homepage/HomeLanding';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BookmarkScreen from '../screens/Bookmark/BookmarkScreen';
import images from '../resource/images';
import {Image} from 'react-native';
import {gray_primary} from '../resource/colors';
import DetailBook from '../screens/DetailBook/DetailBook';
import ForYouAll from '../screens/DetailScreen/ForYouAll';
import FavouritesAll from '../screens/DetailScreen/FavouritesAll';
import SubscribeScreen from '../screens/Profile/SubscribeScreen';
import Pdfscreen from '../screens/WebView/Pdfscreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  function BottomTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: FONT_PRIMARY_BOLD,
            fontSize: 11,
          },
        }}>
        <Tab.Screen
          name="Homepage"
          component={Homepage}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return (
                <Image
                  style={{
                    width: 23,
                    height: 23,
                    tintColor: focused ? '' : gray_primary,
                  }}
                  source={focused ? images.homeActive : images.homeInactive}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
            tabBarIcon: ({size, focused, color}) => {
              return (
                <Image
                  style={{
                    width: 23,
                    height: 23,
                    tintColor: focused ? '' : gray_primary,
                  }}
                  source={
                    focused ? images.bookMarkActive : images.bookMarkInactive
                  }
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return (
                <Image
                  style={{
                    width: 23,
                    height: 23,
                    tintColor: focused ? '' : gray_primary,
                  }}
                  source={focused ? images.userActive : images.userInactive}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Sign In',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          name="Register"
          component={Register}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="ForYouScreen"
          options={{
            headerShown: true,
            title: 'For You',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          component={ForYouAll}
        />
        <Stack.Screen
          name="favouritesAllScreen"
          options={{
            headerShown: true,
            title: 'Most Favourites',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          component={FavouritesAll}
        />
        <Stack.Screen name="Homepage" component={BottomTab} />
        <Stack.Screen name="HomeLanding" component={HomeLanding} />
        <Stack.Screen
          name="DetailBook"
          options={{
            headerShown: true,
            title: 'Detail Buku',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          component={DetailBook}
        />
        <Stack.Screen
          options={{
            headerShown: true,

            title: 'Profile',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Berlangganan Polije Press',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          name="SubscribeScreen"
          component={SubscribeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Pembayaran',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            },
          }}
          name="WebViewScreen"
          component={WebViewScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Read Book',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONT_PRIMARY_BOLD,
              fontSize: 17,
            }, 
          }}
          name="PdfScreen"
          component={Pdfscreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
