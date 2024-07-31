import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import { auth, signInWithEmailAndPassword } from "../components/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../styles/Colors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      // Tarkista Firebase Authenticationin kautta, onko token yhä voimassa
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigation.replace("Welcome"); // Käyttäjä on kirjautunut sisään
        }
      });
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem("userToken", token); // Tallenna token
      navigation.replace("Welcome"); // Kirjautuminen onnistui
    } catch (error) {
      Alert.alert("Kirjautumisvirhe", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Kirjaudu sisään</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("AppInfo")}>
          <Text style={styles.buttonText}>Ei tiliä? Luo tili</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.white
  },
  input: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 50, // Set the desired border radius here
    overflow: "hidden", // Ensure that the button container clips its contents
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    paddingTop: 6,
    paffinBottom: 6,
    width: '80%',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50, 
    overflow: "hidden", 
    marginBottom: 10,
  },
});

export default LoginScreen;
