import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerustaidotJaTekninenOsaaminen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Osaa ohjatusti käyttää vuorovaikutuksellisia ja digitaalisia kieli- ja kulttuuriympäristöjä, jotka lisäävät osallisuutta ja soveltuvat oppilaan ikään nähden tarkoituksenmukaisesti - tulkitsee, lukee ja jakaa havaintojaan, lukukokemuksiaan, taidetta ja kulttuuria. - tutustuu eri kieliin digitaalisten työvälineiden avulla. - harjoittelee vuorovaikutuksellisuutta digitaalisissa ympäristöissä erilaisten ryhmien kanssa. - tutustuu kulttuurin symboliikkaan digitaalisten työvälineiden avulla.', done: false },
    { id: 2, text: 'Osaa ohjatusti osallistua vuoropuheluihin, kuunnella ja tehdä yhteistyötä digitaalisissa, oppimiseen kannustavissa toimintaympäristöissä - oppilas harjoittelee hyvää vuorovaikutusta viestiessään digitaalisissa ympäristöissä. - osaa ohjatusti ratkoa näissä ympäristöissä syntyviä konfliktitilanteita.', done: false },
    { id: 3, text: 'Osaa soittaa ja vastata ääni- ja videopuheluun.', done: false },
    { id: 4, text: 'Opettelee laatimaan ja tulkitsemaan yksinkertaisia kirjoitettuja kielellisiä viestejä ja multimediaviestejä.', done: false },
    { id: 5, text: 'Tutustuu Teams-yhteistyösovellukseen ja Outlook-sähköpostiin - opettelee käsitteitä kuten sähköposti, tekstiviesti, chatti ja twiitti. - harjoittelee lähettämään ja vastaanottamaan sähköpostia ja chattiviestejä.', done: false },
    { id: 6, text: 'Toimii vastuuntuntoisesti ja kunnioittaa muita digitaalisissa ympäristöissä.', done: false },
    { id: 7, text: 'Pelillisyyttä hyödynnetään oppimisen edistäjänä.', done: false },
  ]);

const screenId = 'screen8';

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