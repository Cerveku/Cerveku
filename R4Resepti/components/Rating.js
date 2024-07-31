import { View, Image, StyleSheet } from "react-native";
import React from "react";

export default function Rating({ rating }) {
  const ratingScale = [1, 2, 3, 4, 5];
  const fullStars = Math.floor(rating);
  const modulus = rating % 1;
//Display rating value as accurately as possible using star symbols
  return (
    <View style={styles.stars}>
      {ratingScale.map((item, index) =>
        index < fullStars ? (
          <Image
            style={styles.fullStarImage}
            key={index}
            source={require("../assets/star_filled.png")}
          />
        ) : null
      )}
      {0 < modulus && modulus <= 0.3 && (
        <Image
          style={styles.quarterStarImage}
          source={require("../assets/quarter_star_filled.png")}
        />
      )}
      {0.3 < modulus && modulus <= 0.6 && (
        <Image
          style={styles.halfStarImage}
          source={require("../assets/half_star_filled.png")}
        />
      )}
      {0.6 < modulus && modulus < 1 && (
        <Image
          style={styles.quarterAndHalfStarImage}
          source={require("../assets/half_and_quarter_star_filled.png")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stars: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
  fullStarImage: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  quarterStarImage: {
    width: 5,
    height: 20,
    resizeMode: "cover",
  },
  halfStarImage: {
    width: 10,
    height: 20,
    resizeMode: "cover",
  },
  quarterAndHalfStarImage: {
    width: 15,
    height: 20,
    resizeMode: "cover",
  },
});
