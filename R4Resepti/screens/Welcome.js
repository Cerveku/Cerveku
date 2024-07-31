import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  firestore,
  auth,
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "../components/FirebaseConfig";
import React, { useEffect, useState } from "react";
import DefaultAppBar from "../components/DefaultAppBar";
import Categories from "../components/Categories";
import RecipeCard from "../components/RecipeCard";
import ShowAlert from "../components/ShowAlert";
import { getDatabase, ref, onValue } from "firebase/database";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

export default function Welcome({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserPremium, setIsUserPremium] = useState("");
  const [category, setCategory] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      const database = getDatabase();
      // Fetch user data
      const userRef = ref(database, "users/" + auth.currentUser.uid);
      // Fetch firstName and premium from database and update information if it change
      const unsubscribeUser = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserName(userData.firstName);
          setIsUserPremium(userData.premium);
        }
      });

      // Fetch top recipes
      try {
        onSnapshot(query(collection(firestore, "recipes")), (querySnapshot) => {
          const tempRecipes = [];
          querySnapshot.forEach((doc) => {
            const recipeObject = {
              id: doc.id,
              title: doc.data().recipeData.title,
              servingSize: doc.data().recipeData.servingSize,
              cookTime: doc.data().recipeData.cookTime,
              prepTime: doc.data().recipeData.prepTime,
              photo: doc.data().recipeData.photo,
              premium: doc.data().recipeData.premium,
              //recipeRating is the average of the given ratings
              recipeRating:
                doc.data().recipeData.rating[1] !== 0
                  ? doc.data().recipeData.rating[0] /
                    doc.data().recipeData.rating[1]
                  : 0,
            };
            tempRecipes.push(recipeObject);
          });
          tempRecipes.sort((a, b) => b.recipeRating - a.recipeRating);
          setRecipes(tempRecipes);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        ShowAlert(
          "Virhe",
          "Reseptien hakemisessa ilmeni virhe. Yritä myöhemmin uudelleen."
        );
      }
    } else {
      navigation.replace("Login");
    }
  }, []);

  // Fetch recipes based on category change
  useEffect(() => {
    (() => {
      if (category !== "") {
        try {
          let q;
          if (category === "Jälkiruoka" || category === "Aamiainen") {
            q = query(
              collection(firestore, "recipes"),
              where("recipeData.course", "array-contains", category),
              orderBy("created", "desc")
            );
          } else if (category === "Kanaruoat") {
            q = query(
              collection(firestore, "recipes"),
              where("recipeData.mainIngredient", "array-contains", "Broileri"),
              orderBy("created", "desc")
            );
          } else if (category === "Kasvisruoat") {
            q = query(
              collection(firestore, "recipes"),
              where("recipeData.diet", "array-contains", "Kasvis"),
              orderBy("created", "desc")
            );
          } else if (category === "Nopeat") {
            q = query(
              collection(firestore, "recipes"),
              where("recipeData.cookTime", "==", "alle 15 min"),
              where("recipeData.prepTime", "==", "alle 15 min"),
              orderBy("created", "desc")
            );
          }
          onSnapshot(q, (querySnapshot) => {
            const tempRecipes = [];
            querySnapshot.forEach((doc) => {
              const recipeObject = {
                id: doc.id,
                title: doc.data().recipeData.title,
                servingSize: doc.data().recipeData.servingSize,
                cookTime: doc.data().recipeData.cookTime,
                prepTime: doc.data().recipeData.prepTime,
                photo: doc.data().recipeData.photo,
                premium: doc.data().recipeData.premium,
              };
              tempRecipes.push(recipeObject);
            });
            setRecipes(tempRecipes);
            setIsLoading(false);
          });
        } catch (error) {
          setIsLoading(false);
        }
      }
    })();
  }, [category]);

  return (
    <View style={styles.container}>
      <DefaultAppBar
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.nameAndIcon}>
          <Text style={styles.welcomeText}>
            {userName ? `Tervetuloa ${userName}` : "Tervetuloa"}
          </Text>
          {isUserPremium === "1" && (
            <SimpleLineIcons name="diamond" size={18} color={Colors.diamond} />
          )}
        </View>
        <Text style={styles.infoText}>Mitä haluaisit kokata tänään?</Text>
        <Categories setCategory={setCategory} />
        {/* Show add if user is not premium */}
        {isUserPremium !== "1" && (
          <Image
            style={styles.add}
            source={require("../assets/mainos_vaaka.png")}
          />
        )}
        {category === "" && (
          <Text style={styles.textFavourites}>
            Top 10 suosituimmat reseptit
          </Text>
        )}
        {isLoading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color={Colors.secondary}
          />
        )}
        {/* Show top 10 recipes when category is not choosed*/}
        {!isLoading &&
          category === "" &&
          recipes
            .slice(0, 10)
            .map((item) => (
              <RecipeCard
                key={item.id}
                recipeId={item.id}
                prepTime={item.prepTime}
                urlToImage={item.photo}
                recipeName={item.title}
                cookTime={item.cookTime}
                servingSize={item.servingSize}
                premium={item.premium}
              />
            ))}
        {/* If category is selected show recipes based on the category */}
        {!isLoading &&
          category !== "" &&
          recipes.map((item) => (
            <RecipeCard
              key={item.id}
              recipeId={item.id}
              prepTime={item.prepTime}
              urlToImage={item.photo}
              recipeName={item.title}
              cookTime={item.cookTime}
              servingSize={item.servingSize}
              premium={item.premium}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  add: {
    width: 350,
    height: 100,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  container: {
    backgroundColor: Colors.white,
    paddingBottom: 60,
    flexGrow: 1,
  },
  nameAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    marginLeft: 8,
    paddingRight: 8,
    marginTop: 20,
    marginBottom: 16,
    fontSize: 16,
    textAlign: "center",
  },
  infoText: {
    marginTop: 8,
    marginBottom: 26,
    fontSize: 20,
    color: Colors.grey,
    textAlign: "center",
  },
  textFavourites: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    color: Colors.grey,
    textAlign: "center",
  },
});
