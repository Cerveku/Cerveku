import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [lunch, setLunch] = useState("");

  useEffect(() => {
    // Firebase-konfiguraatio ja alustus
    const firebaseConfig = { /* ... */ };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Hae päivän lounas Firebase-tietokannasta
    const db = firebase.database().ref("weeks");
  db.on('value', (snapshot) => {
    const data = snapshot.val();
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
    <View>
      <Text>Päivän lounas: {lunch}</Text>
    </View>
  );
}
