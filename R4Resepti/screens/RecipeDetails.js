import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import {
  auth,
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  where,
} from "../components/FirebaseConfig";
import { getUser } from "../components/FirebaseConfig";
import GoBackAppBar from "../components/GoBackAppBar";
import RatingBar from "../components/RatingBar";
import Rating from "../components/Rating";
import CommentBox from "../components/CommentBox";
import { Ionicons } from "@expo/vector-icons";
import ShowAlert from "../components/ShowAlert";
import { convertTimeStampToJS } from "../helpers/Functions";
import UpdateToPremium from "../components/UpdateToPremium";
import { Colors } from "../styles/Colors";
import { GetSingleRecipe } from "../components/GetRecipes";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ButtonWithTitleAndIcon from "../components/CustomButtons";

export default function RecipeDetails({ route, ...props }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserPremium, setIsUserPremium] = useState("0");
  const [showModal, setShowModal] = useState(false);

  const scrollViewRef = useRef();
  const { recipeId } = route.params;

  // Fetch the user data from Realtime Database and recipe data
  // and comments from Firestore
  useEffect(() => {
    // if page is scrolled down before, it is automatically scrolled to the
    // top of the page when searching new recipe
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
    let isMounted = true; // Flag to track whether the component is mounted
    const fetchData = async () => {
      try {
        // Fetch the user data
        const userData = await getUser();
        if (isMounted && userData) {
          setIsUserPremium(userData.premium);
        }
        // Fetch the recipe data
        const recipe = await GetSingleRecipe({ recipeId });
        if (isMounted) {
          setRecipeData(recipe);
        }
        // Fetch the comments from Firestore feedbacks collection
        const unsubscribe = onSnapshot(
          query(
            collection(firestore, "feedbacks"),
            where("recipeId", "==", recipeId),
            orderBy("created", "desc")
          ),
          (querySnapshot) => {
            const tempComments = [];
            querySnapshot.forEach((doc) => {
              const commentObject = {
                id: doc.id,
                comment: doc.data().comment,
                created: convertTimeStampToJS(doc.data().created),
                likes: doc.data().like,
                commentUserId: doc.data().userId,
              };
              tempComments.push(commentObject);
            });
            if (isMounted) {
              setComments(tempComments);
              setIsLoading(false);
            }
          }
        );
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
  }, [recipeId]);

  // Save new comment to Firestore
  const saveComment = async () => {
    if (!newComment) {
      ShowAlert("", "Kirjoita kommenttiin tekstiä ennen kuin lähetät sen");
      return;
    } else {
      const docRef = await addDoc(collection(firestore, "feedbacks"), {
        created: serverTimestamp(),
        recipeId: recipeId,
        userId: auth.currentUser.uid,
        comment: newComment,
        like: [],
      }).catch((error) => {
        ShowAlert(
          "Virhe",
          "Virhe kommentin lisäyksessä. Yritä myöhemmin uudelleen."
        );
      });
      setNewComment("");
    }
  };

  return (
    <>
      <GoBackAppBar {...props} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
          {isLoading ? (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large"
              color={Colors.secondary}
            />
          ) : (
            <>
              {recipeData.photo ? (
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

              <Text style={styles.title}>{recipeData.title}</Text>

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
                    style={styles.icon}
                    name="toaster-oven"
                    size={20}
                    color={Colors.grey}
                  />
                  <Text style={styles.infoText}>
                    Kokkausaika: {recipeData.cookTime}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Rating rating={recipeData.rating[0] / recipeData.rating[1]} />
              </View>
              {/*Check if recipe is premium but user is not premium. 
              If true, don't show incredients, instructions or commnets but 
              show window where user can update subscription to premium */}
              {recipeData.premium === "1" && isUserPremium !== "1" ? (
                <UpdateToPremium />
              ) : (
                <>
                  <View style={styles.section}>
                    {recipeData.incredients.map((item, index) => (
                      <Text key={`${index}-incr`} style={styles.incredient}>
                        {item}
                      </Text>
                    ))}
                  </View>
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
                  </View>
                  <Text style={[styles.section, { fontSize: 16 }]}>
                    Kategoriat:
                  </Text>
                  <View style={[styles.section, styles.filtersList]}>
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
                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    <ButtonWithTitleAndIcon
                      icon={"infocirlceo"}
                      color={Colors.primary}
                      width={200}
                      title="Ravintosisältö"
                      onPress={() => {
                        setShowModal(!showModal);
                      }}
                    />
                  </View>
                  {showModal &&
                  recipeData.caloriesKj === "" &&
                  recipeData.caloriesKcal === "" &&
                  recipeData.totalFat === "" &&
                  recipeData.saturatedFat === "" &&
                  recipeData.totalCarb === "" &&
                  recipeData.sugar === "" &&
                  recipeData.protein === "" &&
                  recipeData.salt === "" ? (
                    <>
                      <Modal
                        transparent={true}
                        animationType="slide"
                        visible={showModal}
                        onRequestClose={() => setShowModal(false)}
                      >
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContentNoNutritionalContent}>
                            <View style={styles.closeButton}>
                              <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                  setShowModal(false);
                                }}
                              >
                                <Ionicons
                                  name="close"
                                  size={20}
                                  color={Colors.grey}
                                />
                              </TouchableOpacity>
                            </View>
                            <Text style={styles.noNutritionalContentText}>
                              Valitettavasti tälle reseptille ei ole vielä
                              lisätty ravintosisältöä.
                            </Text>
                          </View>
                        </View>
                      </Modal>
                    </>
                  ) : (
                    <Modal
                      transparent={true}
                      animationType="slide"
                      visible={showModal}
                      onRequestClose={() => setShowModal(false)}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <View style={styles.closeButton}>
                            <TouchableOpacity
                              style={styles.closeButton}
                              onPress={() => {
                                setShowModal(false);
                              }}
                            >
                              <Ionicons
                                name="close"
                                size={20}
                                color={Colors.grey}
                              />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.heading}>Ravintosisältö</Text>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}></Text>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              100 g
                            </Text>
                          </View>
                          <View
                            style={{
                              borderBottomColor: Colors.secondary,
                              borderBottomWidth: 1,
                              marginBottom: 8,
                            }}
                          ></View>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}>Energia</Text>
                            <View style={{ flexDirection: "row", gap: 4 }}>
                              <Text style={{ fontSize: 16 }}>
                                {recipeData.caloriesKj} kJ /
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                {recipeData.caloriesKcal} kCal
                              </Text>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}>Rasva</Text>
                            <Text style={{ fontSize: 16 }}>
                              {recipeData.totalFat} g
                            </Text>
                          </View>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}>
                              josta tyydyttynyttä
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                              {recipeData.saturatedFat} g
                            </Text>
                          </View>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}>Hiilihydraatit</Text>
                            <Text style={{ fontSize: 16 }}>
                              {recipeData.totalCarb} g
                            </Text>
                          </View>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}>
                              josta sokereita
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                              {recipeData.sugar} g
                            </Text>
                          </View>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}>Proteiini</Text>
                            <Text style={{ fontSize: 16 }}>
                              {recipeData.protein} g
                            </Text>
                          </View>

                          <View style={styles.row}>
                            <Text style={{ fontSize: 16 }}>Suola</Text>
                            <Text style={{ fontSize: 16 }}>
                              {recipeData.salt} g
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}
                  <RatingBar recipeId={recipeId} />
                  {comments.map((item) => (
                    <CommentBox
                      key={item.id}
                      commentId={item.id}
                      comment={item.comment}
                      created={item.created}
                      likes={item.likes}
                      commentUserId={item.commentUserId}
                    />
                  ))}
                  <View style={styles.newComment}>
                    <TextInput
                      style={styles.input}
                      placeholder="Kirjoita kommentti..."
                      multiline={true}
                      value={newComment}
                      returnKeyType="send"
                      onSubmitEditing={() => {
                        if (newComment !== "") {
                          saveComment(newComment);
                        }
                      }}
                      onChangeText={(text) => setNewComment(text)}
                    />
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={() => {
                        saveComment();
                      }}
                    >
                      <Ionicons
                        name="send-sharp"
                        size={24}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 250,
    alignSelf: "center",
    marginBottom: 16,
  },
  section: {
    flex: 1,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
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
  numberedInstruction: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
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
    marginBottom: 8,
  },
  instruction: {
    fontSize: 18,
    marginBottom: 8,
    marginRight: 30,
    flexWrap: "wrap",
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000080",
  },
  modalContent: {
    backgroundColor: Colors.white,
    width: "100%",
    height: "50%",
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  closeButton: {
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginLeft: 30,
    marginRight: 39,
  },
  modalContentNoNutritionalContent: {
    backgroundColor: Colors.white,
    width: "100%",
    height: "50%",
    padding: 20,
    borderRadius: 10,
  },
  noNutritionalContentText: {
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 50,
  },
  newComment: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
    marginBottom: 40,
  },

  input: {
    flex: 6,
    minHeight: 50,
    marginRight: 8,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderColor: Colors.secondary,
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
  sendButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
