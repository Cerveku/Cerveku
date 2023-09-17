import React, { useState, useEffect } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from './DarkModeContext';

const SettingsScreen = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setIsDarkMode(JSON.parse(savedDarkMode));
        } else {
          setIsDarkMode(false);  // Default to light mode
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadSettings();
  }, [setIsDarkMode]);

  if (isDarkMode === null) {
    return <View><Text>Loading settings...</Text></View>; // Show a loading message
  }

  const toggleSwitch = async () => {
    setIsDarkMode(previousState => !previousState);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setIsDarkMode(false);  // Reset to default light mode
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>Dark Mode</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
      <Button title="Clear Saved Data" onPress={clearData} />
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  darkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});

export default SettingsScreen;

