import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import ButtonWithTitleAndIcon from "../components/CustomButtons";
import { Colors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import {
  auth,
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  fbStorage,
  ref,
  deleteObject,
} from "../components/FirebaseConfig";
import GoBackAppBar from "../components/GoBackAppBar";
import ShowAlert from "../components/ShowAlert";

export default function AddRecipe({ route, ...props }) {
  // Initialise recipe data and other necessary states
  const [recipeData, setRecipeData] = useState({
    userId: auth.currentUser.uid,
    title: "",
    incredients: "",
    instructions: "",
    course: "",
    mainIngredient: "",
    diet: "",
    source: "",
    servingSize: "",
    prepTime: "",
    cookTime: "",
    caloriesKj: "",
    caloriesKcal: "",
    totalFat: "",
    saturatedFat: "",
    totalCarb: "",
    sugar: "",
    protein: "",
    salt: "",
    photo: "",
    photoName: "",
    rating: [],
    userRated: [],
    premium: "0",
  });

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedMainIngredients, setSelectedMainIngredients] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const [newIngredient, setNewIngredient] = useState("");
  const [tempIngredients, setTempIngredients] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const [newStep, setNewStep] = useState("");
  const [tempSteps, setTempSteps] = useState([]);
  const [showStepInput, setShowStepInput] = useState(false);
  const [stepsNumber, setStepsNumber] = useState(0);

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

  // Set photo url and name to recipeData
  const handlePhoto = (photo, photoName) => {
    setRecipeData({ ...recipeData, photo: photo, photoName: photoName });
  };

  // Add new ingredient to recipeData
  const addIngredient = () => {
    const newIngredients = [...tempIngredients, newIngredient];
    setTempIngredients(newIngredients);
    setShowInput(false);
    setRecipeData({ ...recipeData, incredients: newIngredients });
    setNewIngredient("");
  };

  // Add instruction steps to recipeData
  const addInstructionStep = () => {
    const newSteps = [...tempSteps];
    newSteps.splice(stepsNumber - 1, 0, newStep);
    setTempSteps(newSteps);
    setShowStepInput(false);
    setRecipeData({ ...recipeData, instructions: newSteps });
    setNewStep("");
  };

  // Increase instruction step number by one
  const handleStepUp = () => {
    if (stepsNumber < tempSteps.length + 1) {
      setStepsNumber(stepsNumber + 1);
    }
  };

  // Decrease instruction step number by one
  const handleStepDown = () => {
    if (stepsNumber > 1) {
      setStepsNumber(stepsNumber - 1);
    }
  };

  // Delete specific ingredient
  const deleteItem = (index) => {
    const updatedIngredients = tempIngredients.filter((item, i) => i !== index);
    setTempIngredients(updatedIngredients);
    setRecipeData({ ...recipeData, incredients: updatedIngredients });
  };

  // Delete specific instruction step
  const deleteStep = (index) => {
    const updatedSteps = tempSteps.filter((item, i) => i !== index);
    setTempSteps(updatedSteps);
    setStepsNumber(tempSteps.length);
    setRecipeData({ ...recipeData, instructions: updatedSteps });
  };

  // Initialise navigation
  const navigation = useNavigation();

  // Save the recipeData to Firestore
  const save = async () => {
    if (
      !recipeData.title ||
      !recipeData.incredients ||
      !recipeData.instructions ||
      !recipeData.servingSize ||
      !recipeData.prepTime ||
      !recipeData.cookTime
    ) {
      Alert.alert("Täytä kaikki pakolliset kentät.");
      return;
    } else {
      const docRef = await addDoc(collection(firestore, "recipes"), {
        recipeData,
        created: serverTimestamp(),
      }).catch((error) => {
        ShowAlert(
          "Tallennus epäonnistui!",
          "Reseptin tallennus epäonnistui. Yritä myöhemmin uudelleen."
        );
      });

      setRecipeData({});
      Alert.alert("Resepti tallennettu!");
      navigation.goBack();
    }
  };

  // Delete photo
  const deletePhoto = () => {
    const photoName = recipeData.photoName;
    let imageRef = ref(fbStorage, `images/${photoName}`);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        if (route.params) {
          props.navigation.setParams({ photoUrl: "", photoName: "" });
        }
        setRecipeData({ ...recipeData, photo: "", photoName: "" });
      })
      .catch((error) => {
        Alert.alert("Virhe poistettaessa kuvaa! Yritä myöhemmin uudelleen.");
      });
  };

  return (
    <>
      <GoBackAppBar {...props} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={{ fontSize: 28 }}>Lisää resepti</Text>
            </View>

            <View style={styles.section}>
              <View style={styles.headerRequired}>
                <Text style={styles.header}>Reseptin nimi</Text>
                <Text style={{ color: Colors.primary, fontSize: 20 }}>*</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Reseptin nimi"
                onChangeText={(text) =>
                  setRecipeData({ ...recipeData, title: text })
                }
              />
            </View>

            <View style={styles.section}>
              <View style={styles.headerRequired}>
                <Text style={styles.header}>Ainekset</Text>
                <Text style={{ color: Colors.primary, fontSize: 20 }}>*</Text>
              </View>
              {!showInput ? (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setShowInput(true)}
                >
                  <Ionicons
                    name="add-circle"
                    size={36}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <TextInput
                    placeholder="Lisää ainesosa ja määrä, esim. 400 g perunoita..."
                    style={styles.input}
                    value={newIngredient}
                    onChangeText={(text) => setNewIngredient(text)}
                    onSubmitEditing={() => addIngredient()}
                    returnKeyType="done"
                  />
                </>
              )}
              {tempIngredients.map((item, index) => (
                <View style={styles.ingredient} key={index}>
                  <Text style={styles.ingredientAndStepsText}>{item}</Text>
                  <TouchableOpacity onPress={() => deleteItem(index)}>
                    <Ionicons
                      name="trash-sharp"
                      size={24}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.headerRequired}>
                <Text style={styles.header}>Työvaiheet</Text>
                <Text style={{ color: Colors.primary, fontSize: 20 }}>*</Text>
              </View>
              {!showStepInput ? (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    setShowStepInput(true);
                    setStepsNumber(tempSteps.length + 1);
                  }}
                >
                  <Ionicons
                    name="add-circle"
                    size={36}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <View style={styles.stepInfo}>
                    <TouchableOpacity
                      onPress={() => {
                        handleStepUp();
                      }}
                    >
                      <Entypo name="chevron-up" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.stepNumber}>{stepsNumber}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleStepDown();
                      }}
                    >
                      <Entypo name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    placeholder="Lisää työvaihe, esim. Keitä perunat..."
                    style={styles.input}
                    value={newStep}
                    onChangeText={(text) => setNewStep(text)}
                    onSubmitEditing={() => addInstructionStep()}
                    returnKeyType="done"
                  />
                </>
              )}
              {tempSteps.map((item, index) => (
                <View style={styles.ingredient} key={index}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                  <Text style={styles.ingredientAndStepsText}>{item}</Text>
                  <TouchableOpacity onPress={() => deleteStep(index)}>
                    <Ionicons
                      name="trash-sharp"
                      size={24}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Kuva</Text>
              <View style={{ marginLeft: 12 }}>
                {!route.params?.photoUrl && (
                  <ButtonWithTitleAndIcon
                    onPress={() => {
                      navigation.navigate("PhotoScreen", {
                        calledFrom: "AddRecipe",
                      });
                    }}
                    icon={"plus"}
                    width={140}
                    color={Colors.secondary}
                    title="Lisää kuva"
                  />
                )}
              </View>

              {route.params?.photoUrl && (
                <View style={{ ...styles.section, marginTop: 24 }}>
                  <Image
                    style={styles.recipeImage}
                    source={{ uri: route.params.photoUrl }}
                    onLoad={() =>
                      handlePhoto(route.params.photoUrl, route.params.photoName)
                    }
                  />
                  <View style={styles.roundContainer}>
                    <TouchableOpacity onPress={() => deletePhoto()}>
                      <Ionicons
                        name="trash-sharp"
                        size={24}
                        color={Colors.grey}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.roundContainer, top: "15%" }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PhotoScreen");
                      }}
                    >
                      <Ionicons name="sync" size={24} color={Colors.grey} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.section}>
              <View style={styles.headerRequired}>
                <Text style={styles.header}>Annoskoko</Text>
                <Text style={{ color: Colors.primary, fontSize: 20 }}>*</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Henkilömäärä"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setRecipeData({ ...recipeData, servingSize: text })
                }
              />
            </View>

            <View style={styles.section}>
              <View style={styles.headerRequired}>
                <Text style={styles.header}>Valmisteluaika</Text>
                <Text style={{ color: Colors.primary, fontSize: 20 }}>*</Text>
              </View>
              <SelectList
                boxStyles={styles.input}
                placeholder="Valitse"
                setSelected={(val) =>
                  setRecipeData({ ...recipeData, prepTime: val })
                }
                data={timeOptions}
                search={false}
                save="value"
              />
            </View>

            <View style={styles.section}>
              <View style={styles.headerRequired}>
                <Text style={styles.header}>Kokkausaika</Text>
                <Text style={{ color: Colors.primary, fontSize: 20 }}>*</Text>
              </View>
              <SelectList
                boxStyles={styles.input}
                placeholder="Valitse"
                setSelected={(val) =>
                  setRecipeData({ ...recipeData, cookTime: val })
                }
                data={timeOptions}
                search={false}
                save="value"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Lähde</Text>
              <TextInput
                style={styles.input}
                placeholder="Kirjan nimi, internet-sivusto, tms..."
                onChangeText={(text) =>
                  setRecipeData({ ...recipeData, source: text })
                }
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Ruokalaji</Text>
              <MultipleSelectList
                boxStyles={[styles.input, { height: null }]}
                placeholder="Valitse"
                badgeStyles={{ backgroundColor: Colors.secondary }}
                setSelected={(val) => setSelectedCourses(val)}
                data={courseOptions}
                search={false}
                save="value"
                onSelect={handleCourseSelect}
                label="Omat valinnat"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Pääraaka-aine</Text>
              <MultipleSelectList
                boxStyles={[styles.input, { height: null }]}
                placeholder="Valitse"
                badgeStyles={{ backgroundColor: Colors.secondary }}
                setSelected={(val) => setSelectedMainIngredients(val)}
                data={mainIngredientOptions}
                search={false}
                save="value"
                onSelect={handleMainIngredientSelect}
                label="Omat valinnat"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Ruokavalio</Text>
              <MultipleSelectList
                boxStyles={[styles.input, { height: null }]}
                placeholder="Valitse"
                badgeStyles={{ backgroundColor: Colors.secondary }}
                setSelected={(val) => setSelectedDiets(val)}
                data={dietOptions}
                search={false}
                save="value"
                onSelect={handleDietSelect}
                label="Omat valinnat"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Ravintosisältö</Text>

              <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>Energia</Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <TextInput
                    style={[styles.input, styles.caloriesInput]}
                    placeholder="kJ"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setRecipeData({ ...recipeData, caloriesKj: text })
                    }
                  />
                  <TextInput
                    style={[styles.input, styles.caloriesInput]}
                    placeholder="kcal"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setRecipeData({ ...recipeData, caloriesKcal: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>Rasva</Text>
                <TextInput
                  style={[styles.input, styles.rowInput]}
                  placeholder="Gramaa (g)"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setRecipeData({ ...recipeData, totalFat: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>josta tyydyttynyttä</Text>
                <TextInput
                  style={[styles.input, styles.rowInput]}
                  placeholder="Gramaa (g)"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setRecipeData({ ...recipeData, saturatedFat: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>Hiilihydraatit</Text>
                <TextInput
                  style={[styles.input, styles.rowInput]}
                  placeholder="Gramaa (g)"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setRecipeData({ ...recipeData, totalCarb: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>josta sokereita</Text>
                <TextInput
                  style={[styles.input, styles.rowInput]}
                  placeholder="Gramaa (g)"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setRecipeData({ ...recipeData, sugar: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>Proteiini</Text>
                <TextInput
                  style={[styles.input, styles.rowInput]}
                  placeholder="Gramaa (g)"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setRecipeData({ ...recipeData, protein: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>Suola</Text>
                <TextInput
                  style={[styles.input, styles.rowInput]}
                  placeholder="Gramaa (g)"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setRecipeData({ ...recipeData, salt: text })
                  }
                />
              </View>
            </View>

            <View style={styles.sectionButtons}>
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
                  save();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  section: {
    flex: 1,
    marginBottom: 20,
    marginLeft: 12,
    marginRight: 12,
  },
  sectionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 8,
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 12,
    marginRight: 12,
  },
  headerRequired: {
    flexDirection: "row",
    gap: 4,
  },
  header: {
    height: 40,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 44,
    marginLeft: 12,
    marginRight: 12,
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
  addButton: {
    marginLeft: 8,
    marginBottom: 12,
  },
  ingredientAndStepsText: {
    width: "80%",
  },
  stepInfo: {
    marginLeft: 12,
    marginBottom: 12,
    flexDirection: "column",
    justifyContent: "center",
  },
  stepNumber: {
    marginTop: 6,
    marginBottom: 4,
    marginRight: 4,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 100,
    width: 24, // Adjust the width based on your preference
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  ingredient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 4,
    marginBottom: 4,
  },
  roundContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.grey,
    backgroundColor: "#fff",
    position: "absolute",
    top: "0%",
    bottom: 0,
    left: "90%",
    right: 0,
  },
  recipeImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignSelf: "center",
  },
  multilineInput: {
    paddingTop: 8,
    minHeight: 100,
    marginBottom: 60,
    textAlignVertical: "top",
  },
  caloriesInput: {
    width: 58,
    marginLeft: 0,
    marginRight: 0,
  },
  rowInput: {
    width: 120,
    marginLeft: 0,
    marginRight: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  oneButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    marginRight: 12,
  },
});
