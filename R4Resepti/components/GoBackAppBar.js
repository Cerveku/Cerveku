import React from "react";
import { StyleSheet } from "react-native";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

export default function GoBackAppBar({ navigation }) {
  return (
    <AppBar
      backgroundColor={Colors.primary}
      title={(props) => (
        <HStack style={styles.centerContainer}>
          <IconButton
          style={styles.icon}
          icon={<Ionicons name="arrow-back" size={28} color={Colors.white} />}
          onPress={() => navigation.goBack()}
          {...props}
        />
          <IconButton
          style={styles.icon}
            icon={<Ionicons name="search-outline" size={28} color={Colors.white} />}
            onPress={() => navigation.navigate("SearchRecipe")}
            {...props}
          />
           <IconButton
           style={styles.icon}
            icon={
              <MaterialIcons name="my-library-books" size={28} color={Colors.white} />
            }
            onPress={() => navigation.navigate("OwnRecipes")}
            {...props}
          />
          <IconButton
          style={styles.icon}
            icon={<FontAwesome name="user-circle-o" size={28} color={Colors.white} />}
            onPress={() => navigation.navigate("Profile")}
            {...props}
          />
        </HStack>
      )}
    />
  );
}
const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
    alignItems: 'center',
  },
  icon:{
    paddingRight:'13%',
    paddingLeft:'13%',
  }
});
