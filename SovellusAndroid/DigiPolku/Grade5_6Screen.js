import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Grade5_6Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valitse aihealue</Text>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Perustaidot Ja ... 5-6 LK')}>
          <Text style={styles.topicText}>Perustaidot Ja Tekninen Osaaminen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Tuotanto Ja ... 5-6 LK')}>
          <Text style={styles.topicText}>Tuotanto, esittäminen ja luovat prosessit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Ohjelmointiosaaminen 5-6 LK')}>
          <Text style={styles.topicText}>Ohjelmointiosaaminen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Vastuu Ja ... 5-6 LK')}>
          <Text style={styles.topicText}>Vastuu, turvallisuus, ergonomia ja terveys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Tiedonhallinta Ja ... 5-6 LK')}>
          <Text style={styles.topicText}>Tiedonhallinta ja informaatiolukutaito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Vuorovaikutus Ja ... 5-6 LK')}>
          <Text style={styles.topicText}>Vuorovaikutus, kommunikaatio ja verkostoituminen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Medialukutaito 5-6 LK')}>
          <Text style={styles.topicText}>Medialukutaito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('Lahjakkuus 5-6 LK')}>
          <Text style={styles.topicText}>Lahjakkuus</Text>
        </TouchableOpacity>
        {/* ... */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'white', // Lisätty valkoinen tausta
  },
  scrollContainer: {
    width: '100%', // Lisätty täysi leveys
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  topicBox: {
    width: '90%',
    padding: 15,
    margin: 10,
    backgroundColor: '#d3d3d3', // Harmaa väri
    borderRadius: 50, // Pyöristetyt kulmat
    alignItems: 'center',
  },
  topicText: {
    fontSize: 18,
  },
});

export default Grade5_6Screen;