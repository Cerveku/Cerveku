import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/Colors";

export default function Categories({...props}) {

  // when category button is clicked set selected value to category variable
  const handleButtonClick = (value) => {
    props.setCategory(value)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonClick("Jälkiruoka")}
      >
        <Text style={styles.text}>Jälkiruoat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonClick("Aamiainen")}
      >
        <Text style={styles.text}>Aamiainen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonClick("Nopeat")}
      >
        <Text style={styles.text}>Nopeat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonClick("Kasvisruoat")}
      >
        <Text style={styles.text}>Kasvisruoat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonClick("Kanaruoat")}
      >
        <Text style={styles.text}>Kanaruoat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 16,
    marginTop: 8,
    backgroundColor: Colors.white,
    shadowColor: "#000000",
    ...Platform.select({
      android: {
        elevation: 7,
        overflow: "hidden",
      },
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 10,
  },
});
