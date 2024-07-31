import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  FlatList,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RecipeCard from "../components/RecipeCard";
import GoBackAppBar from "../components/GoBackAppBar";
import { getUser } from "../components/FirebaseConfig";
import { Colors } from "../styles/Colors";
import { Ionicons } from "@expo/vector-icons";
import GetAllRecipes from "../components/GetRecipes";
import ButtonWithTitleAndIcon, {
  RoundButtonWithIcon,
} from "../components/CustomButtons";
import CustomCheckBox from "../components/CustomCheckBox";

export default function SearchRecipe({ ...props }) {
  // Initialise  necessary states
  const [isPremium, setIsPremium] = useState("0");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [showFilterList, setShowFilterList] = useState(false);

  // Course options for filter modal
  const courseOptions = [
    "Aamiainen",
    "Alkupala",
    "Pääruoka",
    "Jälkiruoka",
    "Salaatti",
    "Keitto",
    "Lisuke",
    "Juoma",
  ];

  // Main incredient options for filter modal
  const mainIngredientOptions = [
    "Nauta",
    "Sika",
    "Makkara",
    "Broileri",
    "Kala",
    "Äyriäiset",
    "Kananmuna",
    "Kasviproteiini",
  ];

  // Diet options for filter modal
  const dietOptions = [
    "Kasvis",
    "Vegaaninen",
    "Gluteeniton",
    "Laktoositon",
    "Maidoton",
    "Kananmunaton",
    "Vähähiilihydraattinen",
  ];

  // Fetch the user data from Realtime Database and recipe data from Firestore
  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted
    const fetchData = async () => {
      try {
        // Fetch the user data
        const userData = await getUser();
        if (isMounted && userData) {
          setIsPremium(userData.premium);
        }

        // Fetch the recipe data
        const recipes = await GetAllRecipes();
        if (isMounted) {
          setData(recipes);
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

  // Filter recipes based on input from search bar
  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 2) {
      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          (item.incredients &&
            item.incredients.some((incredient) => {
              return incredient.toLowerCase().includes(text.toLowerCase());
            }))
      );
      setFilteredData(filtered);
    }
  };

  // Filter recipes based on filters added in the modal
  const filterRecipes = () => {
    const filtered =
      filters.length === 0
        ? data
        : data.filter((item) => {
            const courseMatch = filters.some((selectedCourse) => {
              return item.course.includes(selectedCourse);
            });

            const mainIngredientMatch = filters.some(
              (selectedMainIngredient) => {
                return item.mainIngredient.includes(selectedMainIngredient);
              }
            );

            const dietMatch = filters.some((selectedDiet) => {
              return item.diet.includes(selectedDiet);
            });
            return courseMatch || mainIngredientMatch || dietMatch;
          });
    setFilteredData(filtered);
  };

  return (
    <>
      <GoBackAppBar {...props} />
      {loading ? (
        <ActivityIndicator
          size="large"
          animating={true}
          color={Colors.secondary}
        />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.container}>
            {isPremium === "0" && (
              <Image
                style={styles.add}
                source={require("../assets/mainos_vaaka.png")}
              />
            )}
            <View style={styles.section}>
              <View style={styles.searchBar}>
                <TextInput
                  style={styles.input}
                  placeholder="Haku"
                  autoCapitalize="none"
                  clearButtonMode="always"
                  autoCorrect={false}
                  value={query}
                  onChangeText={(text) => handleSearch(text)}
                />
                <View style={styles.searchIcon}>
                  <Ionicons
                    name="search-outline"
                    size={28}
                    color={Colors.grey}
                  />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.filtersAndButtons}>
                {filters.length > 0 && (
                  <View style={styles.filtersList}>
                    {filters.map((item, index) => (
                      <Text style={styles.filterText} key={index}>
                        {item}
                      </Text>
                    ))}
                  </View>
                )}

                <View style={styles.buttonRow}>
                  <RoundButtonWithIcon
                    icon="filter-outline"
                    iconColor="#fff"
                    color={Colors.secondary}
                    library="materialcom"
                    onPress={() => {
                      setShowFilterList(true);
                    }}
                  />
                  <RoundButtonWithIcon
                    icon="filter-remove-outline"
                    iconColor="#fff"
                    color={Colors.grey}
                    library="materialcom"
                    onPress={() => {
                      setFilteredData(data);
                      setFilters([]);
                    }}
                  />
                </View>
              </View>

              <Modal
                transparent={true}
                animationType="slide"
                visible={showFilterList}
                onRequestClose={() => setShowFilterList(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <View style={styles.closeButton}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                          setShowFilterList(false);
                          setFilters([]);
                        }}
                      >
                        <Ionicons name="close" size={20} color={Colors.grey} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.heading}>Suodata hakutuloksia</Text>
                    <ScrollView>
                      <View style={styles.checkBoxSection}>
                        <Text style={styles.headingSmall}>Ruokalaji</Text>
                        <CustomCheckBox
                          options={courseOptions}
                          selectedItems={filters}
                          onSelect={(selected) => setFilters(selected)}
                        />
                      </View>
                      <View style={styles.checkBoxSection}>
                        <Text style={styles.headingSmall}>Pääraaka-aine</Text>
                        <CustomCheckBox
                          options={mainIngredientOptions}
                          selectedItems={filters}
                          onSelect={(selected) => setFilters(selected)}
                        />
                      </View>
                      <View style={styles.checkBoxSection}>
                        <Text style={styles.headingSmall}>Ruokavalio</Text>
                        <CustomCheckBox
                          options={dietOptions}
                          selectedItems={filters}
                          onSelect={(selected) => setFilters(selected)}
                        />
                      </View>
                      <View style={styles.modalButtons}>
                        <ButtonWithTitleAndIcon
                          icon={"filter-remove-outline"}
                          color={Colors.grey}
                          width={140}
                          title="Tyhjennä"
                          library="materialcom"
                          onPress={() => {
                            setFilters([]);
                          }}
                        />
                        <ButtonWithTitleAndIcon
                          icon={"filter-outline"}
                          color={Colors.secondary}
                          width={140}
                          title="Suodata"
                          library="materialcom"
                          onPress={() => {
                            setShowFilterList(false);
                            filterRecipes();
                          }}
                        />
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
              <FlatList
                data={filteredData.length > 0 ? filteredData : data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
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
                )}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section: {
    marginBottom: 20,
    marginLeft: 4,
    marginRight: 4,
  },
  searchBar: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  filtersAndButtons: {
    flexDirection: "row",
    marginLeft: 12,
  },
  filtersList: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
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
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },

  add: {
    width: 350,
    height: 100,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 44,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    paddingLeft: 40,
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
  searchIcon: {
    position: "absolute",
    left: "5%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000080",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    height: "80%",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  headingSmall: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkBoxSection: {
    alignItems: "flex-start",
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 24,
    gap: 8,
  },
});
