import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerustaidotJaTekninenOsaaminen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Opettelee analogista ohjelmointia, ongelmanratkaisua ja tietojenkäsittelyyn liittyvää ajattelua.', done: false },
    { id: 2, text: 'Tutustuu robotiikkaan ja digitaaliseen ohjelmointiin.', done: false },
    { id: 3, text: 'Syventää tietojaan robotiikasta erilaisten videopätkien avulla.', done: false },
    { id: 4, text: 'Opettelee laatimaan, antamaan ja noudattamaan helpohkoja ohjeit - osaa kertoa mitä tekee.', done: false },
    { id: 5, text: 'Osaa ohjatusti, tai yhdessä muiden kanssa tuottaa digitaalista aineistoa, johon sisältyy pelillisiä ja tarinallisia elementtejä  animaation tai yksinkertaisen ohjelmoinnin, avulla.', done: false },
    { id: 6, text: 'Osaa käsitellä eri oppiaineissa harjoiteltavia sisältöjä, käyttäen leikillisesti ja kokeillen ohjelmointiin liittyviä toimintatapoja ja välineitä.', done: false },
    { id: 7, text: 'Osaa ohjata jotakin ohjelmoitavaa laitetta tai yksittäistä hahmoa, jossakin sovelluksessa tai verkkotehtävässä.', done: false },
    { id: 8, text: 'Osaa tunnistaa ja nimetä omasta kokemusmaailmastaan löytyviä tietokoneohjattuja laitteita ja palveluita sekä tutustuu robotiikkaan - osaa kuvailla laitteiden käyttötarkoituksia ja toimintaperiaatteita.', done: false },
    { id: 9, text: 'Oppilas pohtii, millaista tietoa hänen omasta toiminnastaan kerätään digitaalisissa ympäristöissä ja mikä yhteys ohjelmoinnilla on tietojen keräämiseen.', done: false },
    { id: 10, text: 'Oppilas ymmärtää, että kerätyt tiedot tallentuvat ja osaa antaa ainakin yhden esimerkin, mihin tarkoitukseen hänestä kerättyä tietoa voidaan käyttää.', done: false },
  ]);

const screenId = 'screen3';

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