import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import {
  auth,
  firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "./FirebaseConfig";
import { Colors } from "../styles/Colors";

export default function CommentBox({ comment, created, likes, commentUserId, commentId }) {
  const [isLiked, setIsLiked] = useState(false)
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const numberOfLikes = likes.length;
  const likedUserIds = likes;

  useEffect(() => {
    // Check if user has already liked this comment
    if(likedUserIds.includes(auth.currentUser.uid)){
      setIsLiked(true);
    }
    // Get username and profile picture of the user who wrote the comment
    const database = getDatabase();
    const userRef = ref(database, "users/" + commentUserId);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserName(userData.username);
          setPhotoUrl(userData.profilePicture);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

  }, []);

  // Save info that user has liked the comment to database
  const saveLike = async () => {
    setIsLiked(true);
    try {   
      const recipeDoc = doc(collection(firestore, "feedbacks"), commentId);
      const feedbackSnapshot = await getDoc(recipeDoc);
      const currentData = feedbackSnapshot.data();
 
      const currentLikes =
        currentData.like && Array.isArray(currentData.like)
          ? currentData.like.slice()
          : [];
          currentLikes.push(auth.currentUser.uid)

      await updateDoc(recipeDoc, {
        "like": currentLikes,
      });

    } catch (error) {
      console.error("Error saving like:", error);
    }
  };

  // Delete info that user has liked the comment from database
  deleteLike = async () => {
    setIsLiked(false);
    try {
      const recipeDoc = doc(collection(firestore, "feedbacks"), commentId);
      const feedbackSnapshot = await getDoc(recipeDoc);
      const currentData = feedbackSnapshot.data();
  
      const currentLikes = currentData.like && Array.isArray(currentData.like)
        ? currentData.like.slice()
        : [];
  
      const updatedLikes = currentLikes.filter(userId => userId !== auth.currentUser.uid);
  
      await updateDoc(recipeDoc, {
        "like": updatedLikes,
      });
  
    } catch (error) {
      console.error("Error deleting like:", error);
    }
  };

  return (
    <View style={styles.box}>
      <View style={styles.pictureAndUser}>
        {photoUrl ? (
          <Image style={styles.profilePicture} source={{ uri: photoUrl }} />
        ) : (
          <Image
            style={styles.profilePicture}
            source={require('../assets/placeholder-image.png')}
          />
        )}
        {/*If the comment was written by a user whose user account has been deleted, the name will be displayed as "Tuntematon" */}
        <Text style={styles.userNameText}>{userName ? userName : "Tuntematon"} kommentoi</Text>
      </View>
      <Text style={styles.createdText}>{created}</Text>
      <Text style={styles.commentText}>{comment}</Text>
      <View style={styles.likeInfo}>
        <Text style={styles.likerText}>{numberOfLikes ? numberOfLikes : "0"} tykkää tästä</Text>
          {isLiked ? (
            <TouchableOpacity onPress={deleteLike}>
            <AntDesign name="heart" size={30} color={Colors.heart} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={saveLike}>
            <AntDesign name="hearto" size={30} color={Colors.grey} />
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 20,
    borderColor: Colors.secondary,
    borderWidth: 2,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
  },
  pictureAndUser: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userNameText: {
    fontSize: 18,
    color: Colors.grey,
    textAlign: "center",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 36,
    marginLeft: 2,
  },
  createdText: {
    fontSize: 12,
    alignSelf: "flex-start",
    paddingLeft: 4,
    paddingBottom: 2,
  },
  commentText: {
    fontSize: 14,
    alignSelf: "flex-start",
    paddingLeft: 4,
  },
  likeInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    paddingLeft: 4,
  },
  likerText: {
    fontSize: 12,
  },
});
