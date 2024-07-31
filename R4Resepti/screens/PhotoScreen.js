import { View, Alert, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadToStorage } from "../components/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import ShowAlert from "../components/ShowAlert";
import { SquareButtonWithIcon } from "../components/CustomButtons";
import { Colors } from "../styles/Colors";

export default function PhotoScreen({ route }) {
  // Initialise necessary state, navigation
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Get the origin of function call from the route parameters
  const calledFrom = route.params.calledFrom;

  // Take photo using phone camera
  const takePhoto = async () => {
    // Request permission to use the phone camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      ShowAlert(
        "Ei lupaa käyttää kameraa",
        "Anna sovellukselle lupa käyttää puhelimen kameraa, mikäli haluat ottaa kuvan."
      );
    } else {
      try {
        setLoading(true);
        // Display phone camera UI to take the photo
        const cameraResp = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          quality: 1,
          aspect: [1, 1],
        });
        // Handle the camera response
        if (!cameraResp.canceled) {
          const { uri } = cameraResp.assets[0];
          const fileName = uri.split("/").pop();
          const uploadResp = await uploadToStorage(uri, fileName);
          // Navigate back to the component where the function was called
          // from with the photo information
          navigation.navigate({
            name: calledFrom,
            params: {
              photoUrl: uploadResp.downloadUrl,
              photoName: uploadResp.metadata.fullPath,
            },
            merge: true,
          });
        }
        setLoading(false);
      } catch (e) {
        Alert.alert("Error Uploading Image " + e.message);
      }
    }
  };

  // Select photo from phone media library
  const selectPhoto = async () => {
    // Request permission to use phone media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      ShowAlert(
        "Ei lupaa käyttää puhelimen kuvia",
        "Anna sovellukselle lupa käyttää puhelimen kuvia, mikäli haluat lisätä kuvan puhelimestasi."
      );
    } else {
      try {
        setLoading(true);
        // Display the system UI for choosing an image from the phone's library
        const cameraResp = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [1, 1],
        });
        // Handle the camera response
        if (!cameraResp.canceled) {
          const { uri } = cameraResp.assets[0];
          const fileName = uri.split("/").pop();
          // Navigate back to the component where the function was called
          // from with the photo information
          const uploadResp = await uploadToStorage(uri, fileName);
          navigation.navigate({
            name: calledFrom,
            params: {
              photoUrl: uploadResp.downloadUrl,
              photoName: uploadResp.metadata.fullPath,
            },
            merge: true,
          });
        }
        setLoading(false);
      } catch (e) {
        Alert.alert("Error Uploading Image " + e.message);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" animating={true} />
        ) : (
          <>
            <SquareButtonWithIcon
              icon={"camera"}
              color={Colors.primary}
              iconColor={"#fff"}
              onPress={takePhoto}
            />
            <SquareButtonWithIcon
              icon={"picture"}
              color={Colors.primary}
              iconColor={"#fff"}
              onPress={selectPhoto}
            />
            <SquareButtonWithIcon
              icon={"back"}
              color={Colors.grey}
              iconColor={"#fff"}
              onPress={() => navigation.goBack()}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20,
  },
});
