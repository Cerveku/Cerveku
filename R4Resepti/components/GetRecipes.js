import React from "react";
import {
  auth,
  firestore,
  collection,
  query,
  orderBy,
  where,
  doc,
  getDocs,
  getDoc,
} from "../components/FirebaseConfig";
import { convertTimeStampToJS } from "../helpers/Functions";
import ShowAlert from "../components/ShowAlert";

// Fetch all recipes and order them in ascending alphabetical order of the title
export default async function GetAllRecipes() {
  const q = query(
    collection(firestore, "recipes"),
    orderBy("recipeData.title", "asc")
  );
  try {
    const querySnapshot = await getDocs(q);
    const tempRecipes = [];
    querySnapshot.forEach((doc) => {
      const recipeObject = {
        id: doc.id,
        userId: doc.data().recipeData.userId,
        title: doc.data().recipeData.title,
        created: convertTimeStampToJS(doc.data().created),
        incredients: doc.data().recipeData.incredients,
        instructions: doc.data().recipeData.instructions,
        course: doc.data().recipeData.course,
        mainIngredient: doc.data().recipeData.mainIngredient,
        diet: doc.data().recipeData.diet,
        source: doc.data().recipeData.source,
        servingSize: doc.data().recipeData.servingSize,
        prepTime: doc.data().recipeData.prepTime,
        cookTime: doc.data().recipeData.cookTime,
        caloriesKj: doc.data().recipeData.caloriesKj,
        caloriesKcal: doc.data().recipeData.caloriesKcal,
        totalFat: doc.data().recipeData.totalFat,
        saturatedFat: doc.data().recipeData.saturatedFat,
        totalCarb: doc.data().recipeData.totalCarb,
        sugar: doc.data().recipeData.sugar,
        protein: doc.data().recipeData.protein,
        salt: doc.data().recipeData.salt,
        photo: doc.data().recipeData.photo,
        photoName: doc.data().recipeData.photoName,
        rating: doc.data().recipeData.rating,
        userRated: doc.data().recipeData.userRated,
        premium: doc.data().recipeData.premium,
      };
      tempRecipes.push(recipeObject);
    });
    return tempRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

// Fetch users own recipes and order them in descending order of time when created
export async function GetOwnRecipes() {
  const q = query(
    collection(firestore, "recipes"),
    where("recipeData.userId", "==", auth.currentUser.uid),
    orderBy("created", "desc")
  );
  try {
    const querySnapshot = await getDocs(q);
    const tempRecipes = [];
    querySnapshot.forEach((doc) => {
      const recipeObject = {
        id: doc.id,
        userId: doc.data().recipeData.userId,
        title: doc.data().recipeData.title,
        created: convertTimeStampToJS(doc.data().created),
        incredients: doc.data().recipeData.incredients,
        instructions: doc.data().recipeData.instructions,
        course: doc.data().recipeData.course,
        mainIngredient: doc.data().recipeData.mainIngredient,
        diet: doc.data().recipeData.diet,
        source: doc.data().recipeData.source,
        servingSize: doc.data().recipeData.servingSize,
        prepTime: doc.data().recipeData.prepTime,
        cookTime: doc.data().recipeData.cookTime,
        caloriesKj: doc.data().recipeData.caloriesKj,
        caloriesKcal: doc.data().recipeData.caloriesKcal,
        totalFat: doc.data().recipeData.totalFat,
        saturatedFat: doc.data().recipeData.saturatedFat,
        totalCarb: doc.data().recipeData.totalCarb,
        sugar: doc.data().recipeData.sugar,
        protein: doc.data().recipeData.protein,
        salt: doc.data().recipeData.salt,
        photo: doc.data().recipeData.photo,
        photoName: doc.data().recipeData.photoName,
        rating: doc.data().recipeData.rating,
        userRated: doc.data().recipeData.userRated,
        premium: doc.data().recipeData.premium,
      };
      tempRecipes.push(recipeObject);
    });
    return tempRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

// Fetch recipe data of one recipe based on the recipeId
export async function GetSingleRecipe({ recipeId }) {
  try {
    const docRef = await getDoc(doc(firestore, "recipes", recipeId));
    if (docRef.exists()) {
      const data = docRef.data();
      const tempData = {
        id: recipeId,
        userId: data.recipeData.userId,
        title: data.recipeData.title,
        incredients: data.recipeData.incredients,
        instructions: data.recipeData.instructions,
        course: data.recipeData.course,
        mainIngredient: data.recipeData.mainIngredient,
        diet: data.recipeData.diet,
        source: data.recipeData.source,
        servingSize: data.recipeData.servingSize,
        prepTime: data.recipeData.prepTime,
        cookTime: data.recipeData.cookTime,
        caloriesKj: data.recipeData.caloriesKj,
        caloriesKcal: data.recipeData.caloriesKcal,
        totalFat: data.recipeData.totalFat,
        saturatedFat: data.recipeData.saturatedFat,
        totalCarb: data.recipeData.totalCarb,
        sugar: data.recipeData.sugar,
        protein: data.recipeData.protein,
        salt: data.recipeData.salt,
        photo: data.recipeData.photo,
        photoName: data.recipeData.photoName,
        rating: data.recipeData.rating,
        userRated: data.recipeData.userRated,
        premium: data.recipeData.premium,
      };
      // Remove undefined values from the fetched data
      function removeUndefinedValues(obj) {
        Object.entries(obj).forEach(([key, value]) => {
          if (value === undefined) {
            delete obj[key];
          } else if (typeof value === "object" && value !== null) {
            // Recursively check nested objects and arrays
            removeUndefinedValues(value);
          }
        });
      }
      removeUndefinedValues(tempData);
      return tempData;
    } else {
      ShowAlert(
        "Hups!",
        "Nyt kävi hassusti. Tämän reseptin tietoja ei löytynyt. Kokeile jotain toista reseptiä."
      );
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    ShowAlert(
      "Hups!",
      "Nyt kävi hassusti. Tämän reseptin tietoja ei löytynyt. Kokeile jotain toista reseptiä."
    );
  }
}
