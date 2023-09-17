import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

//const Grade5_6Screen = ({ navigation }) => {
  //const topics = [
    //'Perustaidot ja tekninen osaaminen',
    //'Tuotanto, esittäminen ja luovat prosessit',
    //'Ohjelmointiosaaminen',
    //'Vastuu, turvallisuus, ergonomia ja terveys',
    //'Tiedonhallinta ja informaatiolukutaito',
    //'Vuorovaikutus, kommunikaatio ja verkostoituminen',
    //'Medialukutaito',
    //'Lahjakkuus',
    //'Toimintarajoitteiset ja muun tuen tarpeessa olevat oppilaat'
  //];

  //return (
    //<View style={styles.container}>
      //<Text style={styles.title}>5-6 luokka: Valitse aihealue</Text>
      //<ScrollView style={styles.scrollContainer}>
        //{topics.map((topic, index) => (
          //<TouchableOpacity 
            //key={index} 
            //style={styles.topicBox}
            //onPress={() => navigation.navigate(`${topic}Screen`)}
          //>
            //<Text style={styles.topicText}>{topic}</Text>
          //</TouchableOpacity>
        //))}
      //</ScrollView>
    //</View>
  //);
//};*

//const topicToFileMap = {
//  'Perustaidot ja tekninen osaaminen': require('./topics/1_2lk/PerustaidotJaTekninenOsaaminenScreen').default,
//  'Tuotanto, esittäminen ja luovat prosessit': require('./topics/1_2lk/TuotantoEsittaminenJaLuovatProsessitScreen').default,
  //'Ohjelmointiosaaminen': require('./topics/1_2lk/OhjelmointiosaaminenScreen').default,
  //'Vastuu, turvallisuus, ergonomia ja terveys': require('./topics/1_2lk/VastuuTurvallisuusErgonomiaJaTerveysScreen').default,
  //'Tiedonhallinta ja informaatiolukutaito': require('./topics/1_2lk/TiedonhallintaJaInformaatiolukutaitoScreen').default,    
  //'Vuorovaikutus, kommunikaatio ja verkostoituminen': require('./topics/1_2lk/VuorovaikutusKommunikaatioJaVerkostoituminenScreen').default,
  //'Medialukutaito': require('./topics/1_2lk/MedialukutaitoScreen').default,
  //'Lahjakkuus': require('./topics/1_2lk/LahjakkuusScreen').default,
//};

const Grade5_6Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valitse aihealue</Text>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('PerustaidotJaTekninenOsaaminenScreen5', { grade: '1-2' })}>
          <Text style={styles.topicText}>Perustaidot Ja Tekninen Osaaminen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('TuotantoEsittaminenJaLuovatProsessitScreen5', { grade: '3-4' })}>
          <Text style={styles.topicText}>Tuotanto, esittäminen ja luovat prosessit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('OhjelmointiosaaminenScreen5', { grade: '5-6' })}>
          <Text style={styles.topicText}>Ohjelmointiosaaminen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('VastuuTurvallisuusErgonomiaJaTerveysScreen5', { grade: '7-9' })}>
          <Text style={styles.topicText}>Vastuu, turvallisuus, ergonomia ja terveys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('TiedonhallintaJaInformaatiolukutaitoScreen5', { grade: '7-9' })}>
          <Text style={styles.topicText}>Tiedonhallinta ja informaatiolukutaito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('VuorovaikutusKommunikaatioJaVerkostoituminenScreen5', { grade: '1-2' })}>
          <Text style={styles.topicText}>Vuorovaikutus, kommunikaatio ja verkostoituminen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('MedialukutaitoScreen5', { grade: '3-4' })}>
          <Text style={styles.topicText}>Medialukutaito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicBox} onPress={() => navigation.navigate('LahjakkuusScreen5', { grade: '5-6' })}>
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