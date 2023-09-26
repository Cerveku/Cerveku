import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [lunch, setLunch] = useState("Testilounas");

  useEffect(() => {
    console.log('useEffect triggered'); // Debuggausta varten
    // Firebase-konfiguraatio ja alustus
    const firebaseConfig = {
      apiKey: "AIzaSyBYBBYzCyeqCHXPa86ISj0_ode0xh9R2xU",
      authDomain: "myschoollunchapp-d6970.firebaseapp.com",
      databaseURL: "https://myschoollunchapp-d6970-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "myschoollunchapp-d6970",
      storageBucket: "myschoollunchapp-d6970.appspot.com",
      messagingSenderId: "677352536871",
      appId: "1:677352536871:web:62073bbb2dded209a3c702",
      measurementId: "G-LTVRRM1JKN"
    };

    if (!getDatabase().apps.length) {
      initializeApp(firebaseConfig);
    }

    // Hae päivän lounas Firebase-tietokannasta
    const dbRef = ref(getDatabase(), "weeks");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase data:", data);  // Debuggaus
      const today = new Date();
      const currentWeek = getWeekNumber(today); // Voit tehdä oman funktion viikon numeron selvittämiseksi
      const currentDay = getDay(today); // esim. 'ma', 'ti', 'ke'...
      

      if (data[currentWeek] && data[currentWeek][currentDay]) {
        setLunch(data[currentWeek][currentDay]);
      } else {
        setLunch("Ei tietoa");
      }
    });

    // Aseta push-ilmoitus
    const trigger = {
      hour: 10,
      minute: 30,
      repeats: true
    };

    Notifications.scheduleNotificationAsync({ content: { title: "Päivän lounas:", body: lunch }, trigger });
  }, [lunch]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My School Lunch App</Text>
      <Text style={styles.lunchText}>Päivän lounas: {lunch}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lunchText: {
    fontSize: 18,
  },
});