import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor= 'red' />
      <Text style={styles.text}>Hello, world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 10,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default App;