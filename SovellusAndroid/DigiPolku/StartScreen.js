import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

/*const loadSettings = async () => {
  try {
    const savedDarkMode = await AsyncStorage.getItem('darkMode');
    console.log('Saved Dark Mode:', savedDarkMode);  // Add this line
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else {
      setIsDarkMode(false);
    }
  } catch (error) {
    console.log(error);
  }
};*/

const StartScreen = ({ navigation }) => {

  useEffect(() => {
    Alert.alert(
      "Tervetuloa Digipolun sovellukseen!",
      "Sovellus on vielä kehityksen alla, mutta sen on tarkoitus olla opettajan tukena DigiOpetuksessa.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valitse ikäryhmä</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Grade1_2Screen', { grade: '1-2' })}>
          <Text style={styles.boxText}>1-2 luokka</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Grade3_4Screen', { grade: '3-4' })}>
          <Text style={styles.boxText}>3-4 luokka</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Grade5_6Screen', { grade: '5-6' })}>
          <Text style={styles.boxText}>5-6 luokka</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Grade7_9Screen', { grade: '7-9' })}>
          <Text style={styles.boxText}>7-9 luokka</Text>
        </TouchableOpacity>
        {/* ... */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  box: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    margin: 10,
  },
  boxText: {
    fontSize: 18,
  },
});

export default StartScreen;