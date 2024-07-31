import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { StatusBar } from 'react-native'; // Tämä rivi import-lausekkeiden joukossa
import FeedbackBox from './components/palaute'; 

export default function App() {
  const [lunch, setLunch] = useState("Ei tietoa");
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleFeedbackBox = () => {
    setShowFeedbackBox(!showFeedbackBox);
  };

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

  initializeApp(firebaseConfig);

  // Palauttaa nykyisen viikon numeron
  function getWeekNumber(d) {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  // Palauttaa nykyisen päivän lyhenteen
  function getDay(d) {
    const days = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];
    return days[d.getDay()];
  }

  const updateLunch = (date) => {
    const currentWeek = getWeekNumber(date);
    const currentDay = getDay(date);

    const weekRef = ref(getDatabase(), `weeks/${currentWeek}`);

    // Kuuntele tiettyä viikkoa ja päivää koskevat tietokannan muutokset
    onValue(weekRef, (snapshot) => {
      const weekData = snapshot.val();
      if (weekData && weekData[currentDay]) {
        setLunch(weekData[currentDay]);
      } else {
        setLunch("Ei tietoa");
      }
    });
  };

  useEffect(() => {
    updateLunch(currentDate);
  }, [currentDate]);

  const goToNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };
  
  const goToPreviousDay = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    setCurrentDate(previousDate);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{currentDate.toDateString()}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.headerText}>Loviisan kouluruoka</Text>
        <Text style={styles.lunchText}>Päivän lounas: {lunch}</Text>
      </View>

      {/* Lisätään napit seuraavalle päivälle ja edelliselle päivälle */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <Button
          title="Edellinen päivä"
          onPress={goToPreviousDay}
        />
        <Button
          title="Seuraava päivä"
          onPress={goToNextDay}
        />
      </View>

      {/* Sininen nappi vasemmassa alakulmassa */}
      <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Button
          title="Anna palautetta"
          color="blue"
          onPress={toggleFeedbackBox}
        />
      </View>

      {/* Näytä FeedbackBox, jos showFeedbackBox on true */}
      {showFeedbackBox && <FeedbackBox hideFeedback={() => setShowFeedbackBox(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lunchText: {
    fontSize: 18,
  },
  dateBox: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  dateText: {
    fontSize: 16,
  }
});
