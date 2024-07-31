// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getDatabase, ref as realtimeRef, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASEURL,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
};

// Initialise the app
const app = initializeApp(firebaseConfig);

// Get authentication info and connect to the databases and Storage
const auth = getAuth(app);
const realtime = getDatabase();
const firestore = getFirestore();
const fbStorage = getStorage();

// Fetch the user data
const getUser = async () => {
  const userRef = realtimeRef(realtime, "users/" + auth.currentUser.uid);
  try {
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData;
    } else {
      console.log("User data not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Upload file to Firebase Storage
const uploadToStorage = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

// Delete file from Firebase Storage
const deleteFromStorage = async (fileUrl) => {
  try {
    const storageRef = ref(fbStorage, fileUrl);
    await deleteObject(storageRef);
    console.log(`File deleted successfully: ${fileUrl}`);
  } catch (error) {
    console.error(`Error deleting file: ${fileUrl}`, error);
    throw error;
  }
};

export {
  auth,
  signInWithEmailAndPassword,
  firestore,
  fbStorage,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  where,
  ref,
  deleteObject,
  uploadToStorage,
  deleteFromStorage,
  getUser,
};
