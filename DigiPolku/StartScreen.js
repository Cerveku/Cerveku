import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, AsyncStorage, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';

const StartScreen = ({ navigation }) => {

  const [hasRegistered, setHasRegistered] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    grade: ''
  });

  useEffect(() => {
    const checkRegistration = async () => {
      const value = await AsyncStorage.getItem('hasRegistered');
      if (value !== null) {
        setHasRegistered(JSON.parse(value));
      }
    };

    checkRegistration();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleRegister = async () => {
    // Tallenna tiedot Firebaseen
    const userRef = firebase.database().ref('users'); // Osoittaa "users" taulukkoon Firebase-tietokannassa
    const newUser = userRef.push(); // Luo uuden uniikin ID:n käyttäjälle
    newUser.set(userData); // Tallenna userData Firebaseen uuden ID:n alle
  
    // Tallenna merkki laitteelle
    await AsyncStorage.setItem('hasRegistered', JSON.stringify(true));
  
    setHasRegistered(true);
  };

  if (!hasRegistered) {
    return (
      <View>
        <Text>Please register:</Text>
        <TextInput
          placeholder="First Name"
          value={userData.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
        />
        <TextInput
          placeholder="Last Name"
          value={userData.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
        />
        <TextInput
          placeholder="Email"
          value={userData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          placeholder="School"
          value={userData.school}
          onChangeText={(text) => handleInputChange('school', text)}
        />
        <TextInput
          placeholder="Grade"
          value={userData.grade}
          onChangeText={(text) => handleInputChange('grade', text)}
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valitse ikäryhmä</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('1-2 LK')}>
          <Text style={styles.boxText}>1-2 luokka</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('3-4 LK')}>
          <Text style={styles.boxText}>3-4 luokka</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('5-6 LK')}>
          <Text style={styles.boxText}>5-6 luokka</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('7-9 LK')}>
          <Text style={styles.boxText}>7-9 luokka</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Asetukset"
          color="#841584"
          onPress={() => navigation.navigate('Asetukset')}
        />
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
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default StartScreen;
