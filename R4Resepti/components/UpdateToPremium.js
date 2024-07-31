import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ShowAlert from "./ShowAlert";
import { Ionicons } from "@expo/vector-icons";
import { getDatabase, ref, update } from "firebase/database";
import { auth } from "../components/FirebaseConfig";
import { Colors } from "../styles/Colors";


export default function UpdateToPremium() {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const database = getDatabase();

  // Update premium subscription to current users information
  const handleUpdate = () => {
    setIsVisible(false);
    const userProfileRef = ref(database, "users/" + auth.currentUser.uid);
    update(userProfileRef, {
      premium: "1",
    })
      .then(() => {
        navigation.navigate("Welcome");
        ShowAlert("", "Hienoa! Olet nyt premium-käyttäjä!");
      })
      .catch((error) => {
        ShowAlert(
          "Hups!",
          "Tilauksen päivitys premium-versioon epäonnistui. Otathan yhteyden asiakaspalveluumme niin hoidamme asian kuntoon."
        );
      });
  };
  // close modal window and navigate back to Welcome screen
  const closeModalWindow = () => {
    setIsVisible(false);
    navigation.navigate("Welcome");
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModalWindow}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.buttonAndHeading}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModalWindow}
            >
              <Ionicons name="close" size={20} color={Colors.grey} />
            </TouchableOpacity>
            <Text style={styles.heading}>
              Päivitä tilauksesi premium versioon ja pääset tarkastelemaan
              kaikkia reseptejä!
            </Text>
          </View>
          <Text style={styles.information}>
            Saat käyttöösi suuren määrän premium-reseptejä mutta myös huimasti
            muita laadukkaita palveluita, jotka ovat tarjolla vain
            premium-käyttäjille.
          </Text>
          <Text style={styles.offer}>
            Erikoistarjouksena juuri sinulle ensimmäiset kaksi kuukautta vain
            2,99€!
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Päivitä nyt!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalContent: {
    backgroundColor: Colors.white,
    width: "100%",
    height: "70%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonAndHeading: {
    flexDirection: "row",
  },
  closeButton: {
    position: "absolute",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 30,
    textAlign: "center",
  },
  information: {
    marginTop: 20,
    marginBottom: 40,
    color: Colors.grey,
    fontStyle: "italic",
    textAlign: "center",
  },
  offer: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
});
