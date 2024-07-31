import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { GetOwnRecipes } from "../components/GetRecipes";
import { Colors } from "../styles/Colors";
import GoBackAppBar from "../components/GoBackAppBar";
import RecipeCard from "../components/RecipeCard";
import { IconButton } from "../components/CustomButtons";
import { useNavigation } from "@react-navigation/native";
import ShowAlert from "../components/ShowAlert";

export default function OwnRecipes({ ...props }) {
  // Initialise necessary states and navigation
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // Fetch the recipe data from Firestore
  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted
    const fetchData = async () => {
      try {
        // Fetch the recipe data
        const recipes = await GetOwnRecipes();
        if (isMounted) {
          setRecipeData(recipes);
          setLoading(false);
        }

        // Cleanup: Unsubscribe from real-time updates when the component is unmounted
        return () => {
          isMounted = false;
          unsubscribe();
        };
      } catch (error) {
        ShowAlert("Tietojen lataus epäonnistui!", "Yritä myöhemmin uudelleen.");
      }
    };
    fetchData();

    // Cleanup: Ensure that any asynchronous tasks or subscriptions are cleared
    // when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <GoBackAppBar {...props} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.title}>
            <Text style={{ fontSize: 28 }}>Omat reseptit</Text>
          </View>
          {recipeData.length > 0 ? (
            loading ? (
              <ActivityIndicator
                style={styles.activityIndicator}
                size="large"
                color={Colors.secondary}
              />
            ) : (
              <>
                {recipeData.map((item) => (
                  <View key={item.id}>
                    <RecipeCard
                      key={`${item.id}-edit`}
                      recipeId={item.id}
                      prepTime={item.prepTime}
                      urlToImage={item.photo}
                      recipeName={item.title}
                      cookTime={item.cookTime}
                      servingSize={item.servingSize}
                      premium={item.premium}
                    />
                    <View style={styles.editingButton}>
                      <IconButton
                        key={`${item.id}-button`}
                        icon="setting"
                        iconColor={Colors.grey}
                        onPress={() => {
                          navigation.navigate({
                            name: "RecipeEdit",
                            params: {
                              recipeId: item.id,
                            },
                            merge: true,
                          });
                        }}
                      />
                    </View>
                  </View>
                ))}
              </>
            )
          ) : (
            <>
              <Text style={styles.infoText}>
                Täältä löydät lisäämäsi reseptit. Näyttää sille, että et ole
                vielä ehtinyt lisätä yhtään reseptiä.
              </Text>
              <Text style={styles.infoText}>
                Pääset lisäämään uusia reseptejä etusivulla "+"-painikkeen
                avulla.
              </Text>
              <Image
                style={styles.image}
                source={require("../assets/addRecipe_advice.png")}
              />
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    flex: 1,
    height: 72,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  editingContainer: {},
  editingButton: {
    position: "absolute",
    right: 24,
    top: 20,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  image: {
    alignSelf: "center",
    width: 280,
    height: 45,
  },
});
