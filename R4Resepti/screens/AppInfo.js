import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import AnimatedText from "../components/AnimatedText";
import { Colors } from "../styles/Colors";

export default function AppInfo() {
  const [index, setIndex] = useState(0);
  const texts = [
    "Nauti sovelluksen laajasta reseptitarjonnasta. Voit aina luottaa siihen, että reseptit ovat terveellisiä.",
    "Voit hakea reseptejä esimerkiksi ruokalajin, pääraaka-aineen tai ruokavalion perusteella.",
    "Reseptikirjassa pääset myös lisäämään omia reseptejäsi kaikkien nähtäville.",
    "Jatketaan seuraavaksi käyttäjätilin luomiseen!",
  ];

  // Show next text from texts array
  const showNextText = () => {
    if (index < texts.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
    }
  };

  // Show previous text from texts array
  const showPreviousText = () => {
    if (index > 0) {
      const previousIndex = index - 1;
      setIndex(previousIndex);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/blur_screen.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Tervetuloa käyttämään ReseptiKirjaa!</Text>
        {index === 3 ? (
          <AnimatedText text={texts[index]} index={index} />
        ) : (
          <View style={styles.textSlider}>
            {index > 0 ? (
              <TouchableOpacity onPress={showPreviousText}>
                <Entypo name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
            ) : (
              <Entypo name="chevron-left" size={24} color={Colors.grey} />
            )}
            <AnimatedText text={texts[index]} index={index} />
            <TouchableOpacity onPress={showNextText}>
              <Entypo name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  textContainer: {
    backgroundColor: Colors.white,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#000000",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 50,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSlider: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
