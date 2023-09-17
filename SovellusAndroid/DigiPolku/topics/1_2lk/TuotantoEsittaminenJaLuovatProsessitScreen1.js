import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerustaidotJaTekninenOsaaminen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Harjoittelee kertomista, kuvien luomista, äänen ja puheen nauhoittamista, esittämistä sekä kuvaamista ja videokuvaamista, esim. tabletilla ja kännykällä, yhdessä muiden kanssa.', done: false },
    { id: 2, text: 'Osaa kertoa valinnoistaan ja havainnoistaan sanallisesti käsitteiden ja konkreettisten välineiden avulla.', done: false },
    { id: 3, text: 'Harjoittelee muokkaamaan sekä luomaan sähköisiä kirjoja ja kuvakollaaseja.', done: false },
    { id: 4, text: 'Tutustuu erilaisiin oppimista tukeviin sovelluksiin, esim. matematiikassa', done: false },
    { id: 5, text: 'Tuntee ja osaa käyttää jotain ikätasoon sopivaa sovellusta.', done: false },
    { id: 6, text: 'Opettelee luomaan ja muokkaamaan tekstiä Word-tekstinkäsittelyohjelmalla sekä valitsemaan tekstille kirjainkoon ja kirjasintyylin.', done: false },
    { id: 7, text: 'Ymmärtää, mikä on tiedosto ja opettelee tiedostonkäsittelyn perustaidot (tallentaminen, kopioiminen, siirtäminen ja poistaminen).', done: false },
    { id: 8, text: 'Kokeilee, keksii, luo, rakentaa ja tuottaa uutta, digitaalisten ympäristöjen avulla.', done: false },
    { id: 9, text: 'Tutustuu opettajan esimerkkien kautta, Exceliin (laskeminen, taulukot ja kaaviot), Formsiin (lomakkeet/kyselyt, vaikuttamistavat, sähköiset kokeet) ja PowerPointiin (työprosessien suunnittelu ja kuvaus).', done: false },
    { id: 10, text: 'Osaa ohjatusti ilmaista itseään ja ajatuksiaan kuvan, videon, äänen ja tekstin avulla digitaalisissa ympäristöissä.', done: false },
    { id: 11, text: 'Harjoittelee oman työnsä arvioimista.', done: false },
  ]);

const screenId = 'screen6';

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