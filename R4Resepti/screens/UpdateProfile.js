// Importing necessary dependencies from React and React Native
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";

// Importing Firebase authentication and database functions
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";

// Importing additional components and styles
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {
  uploadToStorage,
  deleteFromStorage,
} from "../components/FirebaseConfig";
import ShowAlert from "../components/ShowAlert";
import { Colors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import GoBackAppBar from "../components/GoBackAppBar";
import { FontAwesome5 } from "@expo/vector-icons";
import { CheckBox } from 'react-native-elements';

// Functional component definition
const UpdateProfile = () => {
  // State variables for various user information
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const [bio, setBio] = useState('');
  const [premium, setPremium] = useState("");
  const [setIsBirthDateSelected] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const scrollViewRef = useRef(null);
  const auth = getAuth();
  const database = getDatabase();
  const user = auth.currentUser;

  // Navigation hook
  const navigation = useNavigation();

  // Function for taking a photo using the device camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      ShowAlert(
        "Ei lupaa käyttää kameraa",
        "Anna sovellukselle lupa käyttää puhelimen kameraa, mikäli haluat ottaa kuvan."
      );
      return;
    }

    const cameraResp = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      aspect: [1, 1],
    });

    if (!cameraResp.canceled) {
      setLoading(true);
      const { assets } = cameraResp;
      const uri = assets[0].uri;
      const fileName = uri.split("/").pop();
      const uploadResp = await uploadToStorage(
        uri,
        "profile_images/" + fileName
      );

      setProfilePictureUri(uploadResp.downloadUrl);
      setLoading(false);
    }
  };

  // Function for selecting a photo from the device gallery
  const selectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      ShowAlert(
        "Ei lupaa käyttää puhelimen kuvia",
        "Anna sovellukselle lupa käyttää puhelimen kuvia, mikäli haluat lisätä kuvan puhelimestasi."
      );
      return;
    }

    const libraryResp = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [1, 1],
    });

    if (!libraryResp.canceled) {
      setLoading(true);
      const { assets } = libraryResp;
      const uri = assets[0].uri;
      const fileName = uri.split("/").pop();

      const uploadResp = await uploadToStorage(
        uri,
        "profile_images/" + fileName
      );
      setProfilePictureUri(uploadResp.downloadUrl);
      setLoading(false);
    }
  };

  // useEffect for fetching user profile information on component mount
  useEffect(() => {
    if (user) {
      const userProfileRef = ref(database, "users/" + user.uid);
      onValue(userProfileRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUsername(data.username || "");
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setBirthDate(data.birthDate ? new Date(data.birthDate) : new Date());
          setAddress(data.address || "");
          setProfilePictureUri(data.profilePicture || "");
          setUsername(data.username || "");
          setBio(data.bio || "");
          setPremium(data.premium);
          setPremium(data.premium || "");
          setIsProfileLoaded(true);
        }
      });
    }
  }, [user, database]);

  // Validation function for name fields
  const validateName = (name, fieldName) => {
    if (name.length > 20) {
      Alert.alert("Virhe", `${fieldName} ei voi olla yli 20 merkkiä pitkä.`);
      return false;
    }

    if (!/^[a-zA-ZäöüÄÖÜß ]+$/.test(name)) {
      Alert.alert("Virhe", `${fieldName} voi sisältää vain kirjaimia.`);
      return false;
    }

    return true;
  };

  // Function for handling profile picture deletion
  const handleDeleteProfilePicture = async () => {
    if (!profilePictureUri) {
      return;
    }

    Alert.alert(
      "Poista profiilikuva",
      "Haluatko varmasti poistaa profiilikuvan?",
      [
        {
          text: "Peruuta",
          style: "cancel",
        },
        {
          text: "Poista",
          onPress: () => confirmDeleteProfilePicture(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  // Function to confirm profile picture deletion
  const confirmDeleteProfilePicture = async () => {
    try {
      await deleteFromStorage(profilePictureUri);
      setProfilePictureUri("");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      ShowAlert("Virhe", "Profiilikuvan poistaminen epäonnistui.");
    }
  };

  // Function for handling birthdate change
  const onChangeBirthDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
  
    // Check if the date is in the future
    if (currentDate > new Date()) {
      Alert.alert('Virhe', 'Syntymäaika ei voi olla tulevaisuudessa.');
      return;
    }
  
    // Check if the date indicates an age over 120 years
    const maxAgeDate = new Date();
    maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 120);
    if (currentDate < maxAgeDate) {
      Alert.alert('Virhe', 'Syötetty ikä ylittää sovelluksen asettamat rajoitukset. Tarkistathan ikäsi uudelleen.');
      return;
    }

    setBirthDate(currentDate);
    setIsBirthDateSelected(true);
  };

  // Function for updating the user profile
  const handleUpdateProfile = () => {
    if (!username || !firstName || !lastName || !birthDate) {
      Alert.alert('Virhe', 'Täytä kaikki pakolliset kentät.');
      return;
    }

    if (
      !validateName(firstName, "Etunimi") ||
      !validateName(lastName, "Sukunimi")
    ) {
      return;
    }

    if (user) {
      const userProfileRef = ref(database, "users/" + user.uid);
      set(userProfileRef, {
        username,
        firstName,
        lastName,
        birthDate: birthDate.toISOString().split("T")[0],
        address,
        profilePicture: profilePictureUri,
        bio,
        premium: premium ? premium : "0",
      })
        .then(() => {
          navigation.navigate("Welcome");
        })
        .catch((error) => {
          console.error("Profiilin päivitys epäonnistui:", error);
        });
    }
  };
  // JSX rendering of the component
  return (
    <View style={styles.fullScreenContainer}>
      {isProfileLoaded ? (
        <GoBackAppBar backgroundColor="orange" navigation={navigation} />
      ) : (
        <View style={styles.fakeAppBar}></View>
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        ref={scrollViewRef}
      >
        <View style={styles.profileImageContainer}>
          {profilePictureUri ? (
            <>
              <Image
                source={{ uri: profilePictureUri }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteProfilePicture()}
              >
                <FontAwesome5 name="trash" size={24} color="grey" />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.noImageText}>Ei profiilikuvaa</Text>
          )}
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <Text style={styles.photoButtonText}>Ota profiilikuva</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.photoButton} onPress={selectPhoto}>
            <Text style={styles.photoButtonText}>Valitse profiilikuva</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bioLabel}>Bio:</Text>
        <TextInput
          placeholder="Kerro jotain itsetäsi"
          onChangeText={setBio}
          value={bio}
          style={styles.bioInput}
          onFocus={() => setBio("")}
        />
        <FontAwesome5
          name="asterisk"
          size={10}
          color="orange"
          style={styles.asterisk}
        />
        <Text style={styles.label}>Käyttäjänimi:</Text>
        <TextInput
          placeholder="Kirjoita uusi Käyttäjänimesi"
          onChangeText={setUsername}
          value={username}
          style={styles.input}
          onFocus={() => setUsername("")}
        />
        <FontAwesome5
          name="asterisk"
          size={10}
          color="orange"
          style={styles.asterisk}
        />
        <Text style={styles.label}>Etunimi:</Text>
        <TextInput
          placeholder="Kirjoita etunimesi"
          onChangeText={setFirstName}
          value={firstName}
          style={styles.input}
          onFocus={() => setFirstName("")}
        />
        <FontAwesome5
          name="asterisk"
          size={10}
          color="orange"
          style={styles.asterisk}
        />
        <Text style={styles.label}>Sukunimi:</Text>
        <TextInput
          placeholder="Kirjoita sukunimesi"
          onChangeText={setLastName}
          value={lastName}
          style={styles.input}
          onFocus={() => setLastName("")}
        />
        <Text style={styles.label}>Osoite:</Text>
        <TextInput
          placeholder="Kirjoita osoite muodossa: Katunimi ja numero, postinumero ja -toimipaikka. "
          onChangeText={setAddress}
          value={address}
          style={styles.input}
          onFocus={() => setAddress("")}
        />
        {!isProfileLoaded && (
          <View>
            <Text style={styles.label}>Premium:</Text>
            <CheckBox
              title="Haluan premium-version"
              checked={premium === '1'}
              onPress={() => setPremium(premium === '1' ? '0' : '1')}
              checkedColor="orange"
            />
            <FontAwesome5
              name="asterisk"
              size={10}
              color="orange"
              style={styles.asterisk}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => {
            setShowDatePicker(true);
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <Text style={styles.customButtonText}>Valitse syntymäaika</Text>
        </TouchableOpacity>
  
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeBirthDate}
          />
        )}
  
        {loading && <ActivityIndicator size="large" color={Colors.primary} />}
  
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.customButtonText}>Päivitä profiili</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 0,
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  fakeAppBar: {
    height: 45, 
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 14,
  },
  contentContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  noImageText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  photoButtonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 10,
  },
  customButton: {
    backgroundColor: "orange",
    borderColor: "orange",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  customButtonText: {
    color: "white",
    fontSize: 16,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
  },
  bioLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  bioInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
});

export default UpdateProfile;
