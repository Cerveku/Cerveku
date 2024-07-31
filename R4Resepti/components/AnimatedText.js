import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Colors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";

export default function AnimatedText({ text, index }) {
  const [innerText, setInnerText] = useState("");
  const animation = useRef(new Animated.Value(1));

  const navigation = useNavigation();

  useEffect(() => {
    //set the opacity of the previous text to zero
    Animated.timing(animation.current, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.sin,
    }).start();

    setTimeout(() => {
      setInnerText(text);

      //set the opacity of the next text to one
      Animated.timing(animation.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
        easing: Easing.sin,
      }).start();

      // if the text is last one of the texts array navigate to CreateUser page after 2500 milliseconds
      if (index === 3) {
        const ref = setInterval(() => {
          navigation.navigate("CreateUser");
          clearInterval(ref);
        }, 2500);
      }
    }, 301);
  }, [text]);

  return (
    <View style={styles.textContainer}>
      <Animated.Text style={[styles.text, { opacity: animation.current }]}>
        {innerText}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: 250,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    textAlign: "center",
    color: Colors.grey,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
