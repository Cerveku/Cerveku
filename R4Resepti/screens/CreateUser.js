import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../styles/Colors";

const CreateUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        // Rekisteröinti onnistui
        Alert.alert('Rekisteröinti onnistui', 'Tili luotu onnistuneesti!');
        navigation.navigate('UpdateProfile'); // Olettaen, että haluat ohjata käyttäjän takaisin profiilin päivityssivulle

      })
      .catch((error) => {
        // Virhe rekisteröinnissä
        Alert.alert("Rekisteröintivirhe", error.message);
      });
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Button title="Luo tili" onPress={handleSignUp} color="#FF9C00" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Takaisin" onPress={handleBackToLogin} color="#FF9C00" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: "#FF9C00",
    borderRadius: 50, // Set the desired border radius here
    overflow: "hidden", // Ensure that the button container clips its contents
    marginBottom: 10,
    },
  // Lisää tähän muita tyylejä tarvittaessa
});

export default CreateUser;