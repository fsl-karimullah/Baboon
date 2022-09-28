import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './app/routes/index';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import store from './app/redux/configureStore';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store()}>
      <TailwindProvider utilities={utilities}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <Routes />
      </TailwindProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
