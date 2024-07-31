import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import GoBackAppBar from "../components/GoBackAppBar";
import { GetSingleRecipe } from "../components/GetRecipes";
import { Colors } from "../styles/Colors";
import ButtonWithTitleAndIcon, {
  RoundButtonWithIcon,
  IconButton,
} from "../components/CustomButtons";
import {
  firestore,
  doc,
  updateDoc,
  serverTimestamp,
  fbStorage,
  ref,
  deleteObject,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "../components/FirebaseConfig";
import ShowAlert from "../components/ShowAlert";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

export default function RecipeEdit({ route, ...props }) {
  // Set recipeId from route parameters
  const recipeId = route.params.recipeId;

  // Initialise the necessary statuses
  const [loading, setLoading] = useState(true);
  const [recipeData, setRecipeData] = useState({});
  const [editTitle, setEditTitle] = useState(false);
  const [editIncredients, setEditIncredients] = useState(false);
  const [editInstructions, setEditInstructions] = useState(false);
  const [editCategories, setEditCategories] = useState(false);
  const [showIncredientInput, setShowIncredientInput] = useState(false);
  const [showInstructionInput, setShowInstructionInput] = useState(false);
  const [showCheckboxDropdowns, setShowCheckboxDropdowns] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");
  const [newInstruction, setNewInstruction] = useState("");

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedMainIngredients, setSelectedMainIngredients] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const scrollViewRef = useRef();
  const navigation = useNavigation();

  // Preparation and cooking time options for SelectList
  const timeOptions = [
    { key: "1", value: "alle 15 min" },
    { key: "2", value: "alle 30 min" },
    { key: "3", value: "30-60 min" },
    { key: "4", value: "yli 60 min" },
  ];

  // Course options for MultipleSelectList
  const courseOptions = [
    { key: "1", value: "Aamiainen" },
    { key: "2", value: "Alkupala" },
    { key: "3", value: "Pääruoka" },
    { key: "4", value: "Jälkiruoka" },
    { key: "5", value: "Salaatti" },
    { key: "6", value: "Keitto" },
    { key: "7", value: "Lisuke" },
    { key: "8", value: "Juoma" },
  ];

  // Main incredient options for MultipleSelectList
  const mainIngredientOptions = [
    { key: "1", value: "Nauta" },
    { key: "2", value: "Sika" },
    { key: "3", value: "Makkara" },
    { key: "4", value: "Broileri" },
    { key: "5", value: "Kala" },
    { key: "6", value: "Äyriäiset" },
    { key: "7", value: "Kananmuna" },
    { key: "8", value: "Kasviproteiini" },
  ];

  // Diet options for MultipleSelectList
  const dietOptions = [
    { key: "1", value: "Kasvis" },
    { key: "2", value: "Vegaaninen" },
    { key: "3", value: "Gluteeniton" },
    { key: "4", value: "Laktoositon" },
    { key: "5", value: "Maidoton" },
    { key: "6", value: "Kananmunaton" },
    { key: "7", value: "Vähähiilihydraattinen" },
  ];

  // Fetch the recipe data from Firestore
  useEffect(() => {
    // if page is scrolled down before, it is automatically scrolled to the
    // top of the page when searching new recipe
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
    let isMounted = true; // Flag to track whether the component is mounted
    const fetchData = async () => {
      try {
        // Fetch the recipe data
        const recipe = await GetSingleRecipe({ recipeId });
        if (isMounted) {
          setRecipeData(recipe);
          setLoading(false);
        }

        // Cleanup: Unsubscribe from real-time updates when the
        // component is unmounted
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
  }, [recipeId]);

  // Add new ingredient to recipeData
  const addItem = (type) => {
    if (type === "incredient") {
      const newIngredients = [...recipeData.incredients, newIngredient];
      setRecipeData({ ...recipeData, incredients: newIngredients });
    } else if (type === "instruction") {
      const newInstructions = [...recipeData.instructions, newInstruction];
      setRecipeData({ ...recipeData, instructions: newInstructions });
    }
  };

  // Delete specific ingredient or instruction step
  const deleteItem = (index, type) => {
    if (type === "incredient") {
      const updatedIngredients = recipeData.incredients.filter(
        (item, i) => i !== index
      );
      setRecipeData({ ...recipeData, incredients: updatedIngredients });
    } else if (type === "instruction") {
      const updatedInstructions = recipeData.instructions.filter(
        (item, i) => i !== index
      );
      setRecipeData({ ...recipeData, instructions: updatedInstructions });
    }
  };

  // Set photo url and name to recipeData
  const handlePhoto = (photo, photoName) => {
    setRecipeData({ ...recipeData, photo: photo, photoName: photoName });
  };

  // Delete photo
  const deletePhoto = () => {
    Alert.alert("Poista kuva", "Haluatko varmasti poistaa tämän kuvan?", [
      {
        text: "Peruuta",
        style: "cancel",
      },
      {
        text: "Kyllä",
        onPress: () => {
          const photoName = recipeData.photoName;
          let imageRef = ref(fbStorage, photoName);

          // Delete photo from Firebase Storage
          deleteObject(imageRef)
            .then(() => {
              setRecipeData({ ...recipeData, photo: "", photoName: "" });
            })
            .catch((error) => {
              Alert.alert(
                "Virhe poistettaessa kuvaa! Yritä myöhemmin uudelleen."
              );
            });
        },
      },
    ]);
  };

  // Set selected courses to recipeData
  const handleCourseSelect = () => {
    setRecipeData({ ...recipeData, course: selectedCourses });
  };

  // Set selected main incredients to recipeData
  const handleMainIngredientSelect = () => {
    setRecipeData({ ...recipeData, mainIngredient: selectedMainIngredients });
  };

  // Set selected diets to recipeData
  const handleDietSelect = () => {
    setRecipeData({ ...recipeData, diet: selectedDiets });
  };

  // Update the recipeData to firestore
  const updateRecipeData = async () => {
    if (
      !recipeData.title ||
      !recipeData.incredients ||
      !recipeData.instructions ||
      !recipeData.servingSize ||
      !recipeData.prepTime ||
      !recipeData.cookTime
    ) {
      ShowAlert(
        "Täytä ainakin pakolliset kentät!",
        "Otsikko, ainekset, ohjeet, annoskoko, valmistelu- tai kokkausaika eivät voi olla tyhjänä."
      );
      return;
    } else {
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
      removeUndefinedValues(recipeData);

      const docRef = await updateDoc(doc(firestore, "recipes", recipeId), {
        recipeData,
        lastEdit: serverTimestamp(),
      })
        .then(() => {
          Alert.alert("Resepti tallennettu!");
          navigation.navigate("Welcome");
        })
        .catch((error) => {
          ShowAlert(
            "Tietojen tallennus epäonnistui!",
            "Yritä myöhemmin uudelleen."
          );
        });
    }
  };

  // Delete recipe
  const deleteRecipe = () => {
    Alert.alert("Poista resepti", "Haluatko varmasti poistaa tämän reseptin?", [
      {
        text: "Peruuta",
        style: "cancel",
      },
      {
        text: "Kyllä",
        onPress: async () => {
          try {
            // Delete comments associated with the recipe from Firestore
            const commentsQuery = query(
              collection(firestore, "feedbacks"),
              where("recipeId", "==", recipeId)
            );
            const commentsSnapshot = await getDocs(commentsQuery);
            commentsSnapshot.forEach(async (commentDoc) => {
              await deleteDoc(doc(firestore, "feedbacks", commentDoc.id));
            });

            // Delete photo from Firebase Storage
            const photoName = recipeData.photoName;
            if (photoName) {
              const imageRef = ref(fbStorage, photoName);
              await deleteObject(imageRef);
            }

            // Delete recipe document from Firestore
            const recipeDocRef = doc(firestore, "recipes", recipeId);
            await deleteDoc(recipeDocRef);

            Alert.alert("Resepti poistettu!");
            navigation.navigate("Welcome");
          } catch (error) {
            Alert.alert(
              "Virhe poistettaessa reseptiä! Yritä myöhemmin uudelleen."
            );
          }
        },
      },
    ]);
  };

  return (
    <>
      <GoBackAppBar {...props} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            animating={true}
            color={Colors.secondary}
          />
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
              {route.params?.photoUrl ? (
                <Image
                  style={styles.image}
                  source={{ uri: route.params.photoUrl }}
                  onLoad={() =>
                    handlePhoto(route.params.photoUrl, route.params.photoName)
                  }
                />
              ) : recipeData.photo !== "" ? (
                <Image
                  style={styles.image}
                  source={{ uri: recipeData.photo }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../assets/image_placeholder.png")}
                />
              )}

              <View style={styles.imageButtons}>
                <RoundButtonWithIcon
                  icon="trash-sharp"
                  iconColor="#fff"
                  color={Colors.grey}
                  library="ionicons"
                  onPress={() => deletePhoto()}
                />
                <RoundButtonWithIcon
                  icon="camera"
                  iconColor="#fff"
                  color={Colors.primary}
                  onPress={() => {
                    navigation.navigate("PhotoScreen", {
                      calledFrom: "RecipeEdit",
                    });
                  }}
                />
              </View>
            </View>
            {editTitle ? (
              <View
                style={{
                  ...styles.section,
                  backgroundColor: Colors.lightgrey,
                  borderRadius: 10,
                }}
              >
                <TextInput
                  style={styles.title}
                  value={recipeData.title}
                  multiline
                  autoCorrect={false}
                  onChangeText={(text) => {
                    setRecipeData({ ...recipeData, title: text });
                  }}
                />
                <View style={styles.editingButton}>
                  <IconButton
                    icon="checkcircle"
                    iconColor={Colors.secondary}
                    onPress={() => {
                      setEditTitle(!editTitle);
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.section}>
                <Text style={styles.title}>{recipeData.title}</Text>
                <View style={styles.editingButton}>
                  <IconButton
                    icon="setting"
                    iconColor={Colors.grey}
                    onPress={() => {
                      setEditTitle(!editTitle);
                    }}
                  />
                </View>
              </View>
            )}

            {showCheckboxDropdowns ? (
              <View
                style={{
                  ...styles.section,
                  backgroundColor: Colors.lightgrey,
                  borderRadius: 10,
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Muuta annoskokoa (hlö)"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setRecipeData({ ...recipeData, servingSize: text })
                  }
                />
                <SelectList
                  boxStyles={styles.input}
                  placeholder="Valitse valmisteluaika"
                  setSelected={(val) =>
                    setRecipeData({ ...recipeData, prepTime: val })
                  }
                  data={timeOptions}
                  search={false}
                  save="value"
                />
                <SelectList
                  boxStyles={styles.input}
                  placeholder="Valitse kokkausaika"
                  setSelected={(val) =>
                    setRecipeData({ ...recipeData, cookTime: val })
                  }
                  data={timeOptions}
                  search={false}
                  save="value"
                />
                <View style={styles.editingButton}>
                  <IconButton
                    icon="checkcircle"
                    iconColor={Colors.secondary}
                    onPress={() => {
                      setShowCheckboxDropdowns(!showCheckboxDropdowns);
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={{ ...styles.section, alignItems: "center" }}>
                <View style={styles.iconTextRow}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={20}
                    color={Colors.grey}
                  />
                  <Text style={styles.infoText}>
                    Annoskoko: {recipeData.servingSize} hlö
                  </Text>
                </View>
                <View style={styles.iconTextRow}>
                  <Feather name="clock" size={20} color={Colors.grey} />
                  <Text style={styles.infoText}>
                    Valmisteluaika: {recipeData.prepTime}
                  </Text>
                </View>

                <View style={styles.iconTextRow}>
                  <MaterialCommunityIcons
                    name="toaster-oven"
                    size={20}
                    color={Colors.grey}
                  />
                  <Text style={styles.infoText}>
                    Kokkausaika: {recipeData.cookTime}
                  </Text>
                </View>

                <View style={styles.editingButton}>
                  <IconButton
                    icon="setting"
                    iconColor={Colors.grey}
                    onPress={() => {
                      setShowCheckboxDropdowns(!showCheckboxDropdowns);
                    }}
                  />
                </View>
              </View>
            )}

            {editIncredients ? (
              <View
                style={{
                  ...styles.section,
                  backgroundColor: Colors.lightgrey,
                  borderRadius: 10,
                  paddingTop: 36,
                }}
              >
                {recipeData.incredients.map((item, index) => (
                  <View key={`${index}-incredit`} style={styles.deleteItem}>
                    <IconButton
                      icon="closecircleo"
                      iconColor={Colors.grey}
                      onPress={() => {
                        deleteItem(index, "incredient");
                      }}
                    />
                    <TextInput
                      style={styles.incredientEdit}
                      value={item}
                      multiline
                      autoCorrect={false}
                      onChangeText={(text) => {
                        const updatedIncredients = [...recipeData.incredients];
                        updatedIncredients[index] = text;
                        setRecipeData({
                          ...recipeData,
                          incredients: updatedIncredients,
                        });
                      }}
                    />
                  </View>
                ))}
                <View style={styles.editingButton}>
                  <IconButton
                    icon="pluscircle"
                    iconColor={Colors.primary}
                    onPress={() => {
                      setShowIncredientInput(!showIncredientInput);
                    }}
                  />
                  <IconButton
                    icon="checkcircle"
                    iconColor={Colors.secondary}
                    onPress={() => {
                      setEditIncredients(!editIncredients);
                    }}
                  />
                </View>
                {showIncredientInput && (
                  <TextInput
                    placeholder="Lisää ainesosa ja määrä, esim. 400 g perunoita..."
                    style={styles.input}
                    value={newIngredient}
                    onChangeText={(text) => setNewIngredient(text)}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      addItem("incredient");
                      setShowIncredientInput(!showIncredientInput);
                      setNewIngredient("");
                    }}
                  />
                )}
              </View>
            ) : (
              <View style={styles.section}>
                {recipeData.incredients.map((item, index) => (
                  <Text key={`${index}-incr`} style={styles.incredient}>
                    {item}
                  </Text>
                ))}
                <View style={styles.editingButton}>
                  <IconButton
                    icon="setting"
                    iconColor={Colors.grey}
                    onPress={() => {
                      setEditIncredients(!editIncredients);
                    }}
                  />
                </View>
              </View>
            )}

            {editInstructions ? (
              <View
                style={{
                  ...styles.section,
                  backgroundColor: Colors.lightgrey,
                  borderRadius: 10,
                  paddingTop: 36,
                }}
              >
                {recipeData.instructions.map((item, index) => (
                  <View
                    key={`${index}-instredit`}
                    style={styles.numberedInstruction}
                  >
                    <IconButton
                      icon="closecircleo"
                      iconColor={Colors.grey}
                      onPress={() => {
                        deleteItem(index, "instruction");
                      }}
                    />
                    <TextInput
                      style={styles.instruction}
                      value={item}
                      multiline
                      autoCorrect={false}
                      onChangeText={(text) => {
                        const updatedInstructions = [
                          ...recipeData.instructions,
                        ];
                        updatedInstructions[index] = text;
                        setRecipeData({
                          ...recipeData,
                          instructions: updatedInstructions,
                        });
                      }}
                    />
                  </View>
                ))}
                <View style={styles.editingButton}>
                  <IconButton
                    icon="pluscircle"
                    iconColor={Colors.primary}
                    onPress={() => {
                      setShowInstructionInput(!showInstructionInput);
                    }}
                  />
                  <IconButton
                    icon="checkcircle"
                    iconColor={Colors.secondary}
                    onPress={() => {
                      setEditInstructions(!editInstructions);
                    }}
                  />
                </View>
                {showInstructionInput && (
                  <TextInput
                    placeholder="Lisää työvaihe, esim. Keitä perunat..."
                    style={styles.input}
                    value={newInstruction}
                    onChangeText={(text) => setNewInstruction(text)}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      addItem("instruction");
                      setShowInstructionInput(!showInstructionInput);
                      setNewInstruction("");
                    }}
                  />
                )}
              </View>
            ) : (
              <View style={styles.section}>
                {recipeData.instructions.map((item, index) => (
                  <View
                    key={`${index}-instr`}
                    style={styles.numberedInstruction}
                  >
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                    <Text style={styles.instruction}>{item}</Text>
                  </View>
                ))}
                <View style={styles.editingButton}>
                  <IconButton
                    icon="setting"
                    iconColor={Colors.grey}
                    onPress={() => {
                      setEditInstructions(!editInstructions);
                    }}
                  />
                </View>
              </View>
            )}

            {editCategories ? (
              <View style={styles.section}>
                <View>
                  <MultipleSelectList
                    boxStyles={[styles.input, { height: null }]}
                    placeholder="Valitse ruokalaji"
                    badgeStyles={{ backgroundColor: Colors.secondary }}
                    setSelected={(val) => setSelectedCourses(val)}
                    data={courseOptions}
                    search={false}
                    save="value"
                    onSelect={handleCourseSelect}
                    label="Omat valinnat"
                  />
                </View>
                <View>
                  <MultipleSelectList
                    boxStyles={[styles.input, { height: null }]}
                    placeholder="Valitse pääraaka-aine"
                    badgeStyles={{ backgroundColor: Colors.secondary }}
                    setSelected={(val) => setSelectedMainIngredients(val)}
                    data={mainIngredientOptions}
                    search={false}
                    save="value"
                    onSelect={handleMainIngredientSelect}
                    label="Omat valinnat"
                  />
                </View>
                <View>
                  <MultipleSelectList
                    boxStyles={[styles.input, { height: null }]}
                    placeholder="Valitse ruokavalio"
                    badgeStyles={{ backgroundColor: Colors.secondary }}
                    setSelected={(val) => setSelectedDiets(val)}
                    data={dietOptions}
                    search={false}
                    save="value"
                    onSelect={handleDietSelect}
                    label="Omat valinnat"
                  />
                </View>
                <View style={styles.editingButton}>
                  <IconButton
                    icon="checkcircle"
                    iconColor={Colors.secondary}
                    onPress={() => {
                      setEditCategories(!editCategories);
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.section}>
                <Text style={{ fontSize: 16 }}>Kategoriat:</Text>
                <View style={styles.filtersList}>
                  {recipeData.course &&
                    recipeData.course?.map((item, index) => (
                      <Text key={index} style={styles.filterText}>
                        {item}
                      </Text>
                    ))}
                  {recipeData.mainIncredient &&
                    recipeData.mainIncredient?.map((item, index) => (
                      <Text key={index} style={styles.filterText}>
                        {item}
                      </Text>
                    ))}
                  {recipeData.diet &&
                    recipeData.diet?.map((item, index) => (
                      <Text key={index} style={styles.filterText}>
                        {item}
                      </Text>
                    ))}
                </View>
                <View style={styles.editingButton}>
                  <IconButton
                    icon="setting"
                    iconColor={Colors.grey}
                    onPress={() => {
                      setEditCategories(!editCategories);
                    }}
                  />
                </View>
              </View>
            )}
            <View style={{ ...styles.section, alignItems: "center" }}>
              <View style={styles.sectionButtons}>
                <View style={styles.buttonRow}>
                  <ButtonWithTitleAndIcon
                    icon={"back"}
                    color={Colors.grey}
                    width={140}
                    title="Peruuta"
                    onPress={() => {
                      setRecipeData({});
                      navigation.goBack();
                    }}
                  />
                  <ButtonWithTitleAndIcon
                    icon={"arrowdown"}
                    color={Colors.primary}
                    width={140}
                    title="Tallenna"
                    onPress={() => {
                      updateRecipeData();
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 50,
                    marginBottom: 40,
                    alignItems: "center",
                  }}
                >
                  <ButtonWithTitleAndIcon
                    icon={"trash-sharp"}
                    library="ionicons"
                    color={Colors.white}
                    width={200}
                    iconColor="red"
                    borderColor="red"
                    title="Poista resepti"
                    onPress={() => {
                      deleteRecipe();
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 48,
  },
  imageContainer: {
    flex: 1,
  },
  imageButtons: {
    gap: 6,
    position: "absolute",
    bottom: 10,
    right: 16,
  },
  editingButton: {
    flexDirection: "row",
    position: "absolute",
    right: 4,
    top: 4,
  },
  image: {
    width: "100%",
    height: 250,
    alignSelf: "center",
  },
  section: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
  },
  iconTextRow: {
    flexDirection: "row",
  },
  infoText: {
    fontSize: 16,
    paddingLeft: 8,
  },
  incredient: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 30,
  },
  incredientEdit: {
    fontSize: 18,
    marginBottom: 4,
    marginRight: 12,
  },
  filtersList: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 20,
    gap: 4,
  },
  filterText: {
    backgroundColor: Colors.lightgrey,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  deleteItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    height: 44,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 12,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderColor: Colors.secondary,
    backgroundColor: "white",
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
  numberedInstruction: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginRight: 30,
  },
  stepNumber: {
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    color: Colors.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  instruction: {
    fontSize: 18,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  sectionButtons: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    justifyContent: "flex-start",
  },
});
