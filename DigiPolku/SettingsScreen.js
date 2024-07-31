import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

const SettingsScreen = () => {

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      // Data cleared successfully
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Clear Saved Data" onPress={clearData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default SettingsScreen;
