import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerustaidotJaTekninenOsaaminen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Oppilas osaa järjestää ja vertailla asioita erilaisten ehtojen perusteella, kuten muodon samankaltaisuus  - tunnistaa loogisia operaatioita, kuten ”ja”, ”tai”, ”ei”.', done: false },
    { id: 2, text: 'Osaa kertoa valinnoistaan ja havainnoistaan sanallisesti käsitteiden ja konkreettisten välineiden avulla.', done: false },
    { id: 3, text: 'Tutustuu osana opetusta tietotekniikkaan, sen toimintaan ja rooliin yhteiskunnassa - esim. sähköisiin kirjoihin, podcasteihin, vlogeihin, videoihin, sähköiseen oppimateriaaliin, geomediaan.', done: false },
    { id: 4, text: 'Tutustuu netiketin ja lähdekritiikin käsitteisiin. Harjoittelee ohjatusti: - lähteiden luotettavuuden arvioimista - löydetyn tiedon luotettavuuden arvioimista.', done: false },
    { id: 5, text: 'Osaa ohjatusti etsiä, siirtää ja käsitellä oleellista tietoa erilaisissa digitaalisissa kieliympäristöissä.', done: false },
    { id: 6, text: 'Osaa ohjatusti tehdä kiinnostavia tutkimuksia ja havaintoja koulu- ja lähiympäristössä yksinkertaisia digitaalisia tutkimusvälineitä käyttäen - harjoittelee havainnoimaan syy-seuraussuhdetta. - harjoittelee havaintojensa kuvailua.', done: false },
    { id: 7, text: 'Oppilas osaa purkaa tuttuun arjen ilmiöön liittyvän ongelman osiin sekä etsiä ja kokeilla sen ratkaisuun erilaisia vaihtoehtoja - osaa kertoa ratkaisutavoistaan.', done: false },
    { id: 8, text: 'Osaa käyttää hakukonetta tarkoituksenmukaisella tavalla - osaa muodostaa yksinkertaisia hakusanoja tiedonetsinnässä. - harjoittelee käyttämään kuva- ja äänihakua. - harjoittelee etsimään tietoa ja luomaan monimuotoisia tekstejä haetun tiedon perusteella.', done: false },
    { id: 9, text: 'Opettelee kuvankäsittelyn ja kuvien levittämisen sääntöjä, kysyy luvan kuvatessaan muita ja julkaistessaan heistä aineistoa.', done: false },
  ]);

const screenId = 'screen5';

useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem(`tasks_${screenId}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    };
    
    loadTasks();
  }, []);

useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem(`tasks_${screenId}`, JSON.stringify(tasks));
    };

    saveTasks();
  }, [tasks]);

  const toggleTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    }).sort((a, b) => a.done - b.done);

    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskBubble}>
            <Text style={styles.taskText}>{task.text}</Text>
            <TouchableOpacity
              style={task.done ? styles.doneButton : styles.button}
              onPress={() => toggleTask(task.id)}
            >
              <View />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  taskBubble: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    margin: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 50,
  },
  taskText: {
  flexShrink: 1,
  },
  button: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: 'blue',
  },
  doneButton: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: 'green',
  },
});

export default PerustaidotJaTekninenOsaaminen1;