import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Colors } from "../styles/Colors";

export default function RecipeCard({recipeId, prepTime, urlToImage, recipeName, cookTime, servingSize, premium}) {

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("RecipeDetails", {recipeId});
      }}
    >
      {urlToImage ? (
        <Image style={styles.image} source={{ uri: urlToImage }} />
      ) : (
        <Image
          style={styles.image}
          source={require("../assets/image_placeholder.png")}
        />
      )}
      <View style={styles.recipeCardText}>
        <Text style={styles.recipeName}>{recipeName}</Text>
        <View style={styles.recipeInfoAndDiamond}>
        <View style={styles.recipeInfo}>
          <View style={styles.servingSize}>
        <MaterialCommunityIcons
            style={styles.icon}
            name="account-group"
            size={18}
            color={Colors.grey}
          />
          <Text style={styles.infoText}>{servingSize} hlö</Text>
          </View>
          <View style={styles.iconAndTextTime}>
          <Feather style={styles.icon} 
          name="clock" 
          size={16} 
          color={Colors.grey} 
          />
          <Text style={styles.infoText}>{prepTime}</Text>
          <MaterialCommunityIcons
            style={styles.icon}
            name="toaster-oven"
            size={18}
            color={Colors.grey}
          />
          <Text style={styles.infoText}>{cookTime}</Text>
          </View>
        </View>
        <View style={styles.diamond}> 
        {premium === "1" && <SimpleLineIcons name="diamond" size={18} color={Colors.diamond} />}
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderRadius: 10,
    borderColor: Colors.secondary,
    borderWidth: 2,
    padding: 6,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 14,
    marginBottom: 4,
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 36,
    marginLeft: 2,
  },
  recipeCardText: {
    flexDirection: "column",
    flex: 1,
    maxWidth: 200,
    alignItems: "center",
    flexWrap: "wrap",
  },
  recipeName: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 12,
    maxWidth: "80%",
    alignSelf:'center'
  },
  diamond:{
    marginLeft: 10,
    marginRght: "auto",
    justifyContent: "center",
  },
  recipeInfoAndDiamond:{
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between", 
    maxWidth: "80%",
  },
  recipeInfo: {
    flexDirection: "column",
    justifyContent: 'center'
  },
  servingSize: {
    flexDirection: "row",
    justifyContent:'center',
  },
  iconAndTextTime: {
    flexDirection: "row",
    justifyContent:'center',
  },
  infoText: {
    fontSize: 12,
    paddingRight: 4,
  },
  icon: {
    paddingRight: 4,
  },
});
