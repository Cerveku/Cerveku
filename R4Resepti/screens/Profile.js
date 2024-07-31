// Import necessary components and libraries
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

//Import custom component
import GoBackAppBar from '../components/GoBackAppBar';

// Import Firebase authentication and database functions
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

// Import navigation hook
import { useRoute } from '@react-navigation/native';

// Import color constants and icon component
import { Colors } from "../styles/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";

// Profile component
const Profile = ({ navigation }) => {
  // State variables
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremiumVisible, setIsPremiumVisible] = useState(true);

  // Get current route
  const route = useRoute();

  // Firebase authentication and database instances
  const auth = getAuth();
  const database = getDatabase();
  const user = auth.currentUser;

  // Reference for ScrollView
  const scrollViewRef = useRef(null);
  
  // Effect to fetch user data on component mount
  useEffect(() => {
    if (user) {
      const userProfileRef = ref(database, 'users/' + user.uid);
      const unsubscribe = onValue(userProfileRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.error('Käyttäjätietoja ei löydy');
        }
        setLoading(false);
      }, (error) => {
        console.error('Virhe haettaessa käyttäjätietoja:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, database]);

  // Navigate to update profile screen
  const navigateToUpdateProfile = () => {
    navigation.navigate('UpdateProfile');
  };

  // Confirm logout with an alert
  const confirmLogout = () => {
    Alert.alert(
      'Kirjaudu ulos',
      'Oletko varma että haluat kirjautua ulos?',
      [
        {
          text: 'Ei',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Kyllä',
          onPress: () => handleLogout(),
        },
      ]
    );
  };

  // Logout user
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
  
  // Render user data based on a predefined order
  const renderUserData = () => {
    const fieldOrder = ['bio', 'username', 'firstName', 'lastName', 'address', 'birthDate'];

    return fieldOrder.map((key) => {
      const originalValue = userData[key];
      let value = originalValue;

      // Format birthdate if present
      if (key === 'birthDate' && value) {
        const date = new Date(value);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        value = formattedDate;
      }
      
      // Map field names for better readability
      const fieldMappings = {
        bio: 'Bio',
        username: 'Käyttäjänimi',
        firstName: 'Etunimi',
        lastName: 'Sukunimi',
        birthDate: 'Syntymäaika',
        address: 'Osoite',
        profilePicture: 'Profiilikuva',
      };

      // Style for data boxes, with specific styling for Bio
      const boxStyle = {
        ...styles.dataBox,
        ...(fieldMappings[key] === 'Bio' && { borderWidth: 2, borderColor: Colors.secondary, height: 130, marginTop: -10 }),
      };

      // Render data boxes if mapping exists and the original value is present
      if (fieldMappings[key] && originalValue) {
        return (
          <View style={boxStyle} key={key}>
            <Text style={styles.dataTitle}>{fieldMappings[key]}: </Text>
            {key === 'bio' ? (
              <Text style={styles.dataValue} numberOfLines={4}>{value}</Text>
            ) : (
              <Text style={styles.dataValue}>{value}</Text>
            )}
          </View>
        );
      }
      return null;
    });
  };
  
  // Handle scroll events to show/hide premium icon
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const threshold = 100; // Adjust this value based on when you want the premium icon to hide

    setIsPremiumVisible(scrollPosition < threshold);
  };

  // Loading indicator while data is being fetched
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  // Main component JSX
  return (
    <View style={styles.container}>
      {/* App bar with custom styling */}
      <GoBackAppBar backgroundColor={Colors.primary} navigation={navigation} />
      
      {/* Scroll view with onScroll handler and reference */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        ref={scrollViewRef}
        scrollEventThrottle={16} // Adjust the throttle value as needed
      >
        {/* Check if user is premium and render diamond icon if visible */}
        {isPremiumVisible && userData?.premium === "1" && (
          <View style={styles.premiumIconContainer}>
            <SimpleLineIcons name="diamond" size={40} color={Colors.diamond} />
          </View>
        )}
        
        {/* Render user profile picture or a placeholder */}
        {userData?.profilePicture ? (
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
          </View>
        ) : (
          <View style={styles.profileImageContainer}>
            <Image source={require('../assets/placeholder-image.png')} style={styles.profileImage} />
          </View>
        )}
        
        {/* Render user data or a message if no data is available */}
        {userData ? (
          <View style={styles.userData}>
            {renderUserData()}
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <Text>Käyttäjätietoja ei ole saatavilla</Text>
          </View>
        )}
        
        {/* Button container with options to update profile and logout */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.customButton, { backgroundColor: Colors.primary }]} onPress={navigateToUpdateProfile}>
            <Text style={styles.buttonText}>Muokkaa tietoja</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customButton, { backgroundColor: Colors.primary }]} onPress={confirmLogout}>
            <Text style={styles.buttonText}>Kirjaudu ulos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Styles for various components
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: Colors.secondary,
    borderWidth: 2,
  },
  userData: {
    padding: 10,
  },
  noDataContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dataBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    borderColor: Colors.secondary,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  dataTitle: {
    fontWeight: 'bold',
    color: '#333333',
  },
  dataValue: {
    color: '#555555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  customButton: {
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  premiumIconContainer: {
    position: 'absolute',
    top: '1%',
    left: '1%',
    zIndex: 1,
  },
});

export default Profile;