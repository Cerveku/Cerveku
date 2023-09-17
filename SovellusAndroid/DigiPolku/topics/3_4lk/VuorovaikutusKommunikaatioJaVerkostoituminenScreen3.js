import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerustaidotJaTekninenOsaaminen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Osaa käynnistää, kirjautua sisään ja ulos järjestelmistä ja laitteista.', done: false },
    { id: 2, text: 'Hallitsee MS 365:n käyttäjätunnusten käytön.', done: false },
    { id: 3, text: 'Osaa tallentaa MS 365:n suosikiksi selaimeen.', done: false },
    { id: 4, text: 'Tutustuu MS 365:n perustoimintoihin.', done: false },
    { id: 5, text: 'Tutustuu myös näppäimistöön, näppäimistön toimintoihin, hiireen ja kymmensormijärjestelmään.', done: false },
    { id: 6, text: 'Tutustuu helppokäyttöisiin piirrosohjelmiin ja käyttää geometrisiä kuvioita.', done: false },
    { id: 7, text: 'Hallitsee tabletin käytön.', done: false },
    { id: 8, text: 'Osaa ohjatusti tulostaa paperille tai PDF-tiedostoksi, harkinnan mukaan.', done: false },
    { id: 9, text: 'Ymmärtää internetin ja selaimen käsitteet ja osaa käyttää selainta ', done: false },
    { id: 10, text: 'Ymmärtää käytössään olevien digitaalisten ympäristöjen keskeisiin toimintoihin liittyvät käsitteet ja symbolit', done: false },
    { id: 11, text: 'Osaa nimetä laitteistoa ja tunnistaa yleisimmät symbolit ja emojit.', done: false },
    { id: 12, text: 'Osaa ohjatusti liittää laitteen langattomaan verkkoon.', done: false },
    { id: 13, text: 'Ymmärtää mihin Wilma-oppilashallintojärjestelmää käytetään.', done: false },
    { id: 14, text: 'Havainnoi ja ymmärtää teknologian vaikutuksia arjessa.', done: false },
  ]);

const screenId = 'screen16';

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