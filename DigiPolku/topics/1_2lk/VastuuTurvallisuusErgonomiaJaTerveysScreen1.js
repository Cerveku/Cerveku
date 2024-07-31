import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerustaidotJaTekninenOsaaminen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Opettelee käsittelemään laitteita, digitaalisia välineitä ja koulun digitaalisia ympäristöjä vastuullisesti ja kestävästi, aluksi ohjatusti ja myöhemmin itsenäisesti.', done: false },
    { id: 2, text: 'Opettelee toimimaan turvallisesti erilaisissa digitaalisissa ympäristöissä ja osaa toimia, jos apua tarvitaan. ', done: false },
    { id: 3, text: 'Ymmärtää verkossa olevan tiedon luonnetta - ymmärtää, että kuka tahansa voi tuottaa sisältöä verkkoon.', done: false },
    { id: 4, text: 'Tutustuu ikärajoihin ja ymmärtää niiden tarkoituksen.', done: false },
    { id: 5, text: 'Ymmärtää käyttäjätilin ja tietosuojan käsitteet - tuntee hyvän salasanan tunnusmerkit ja tietää, miksi salasanat vanhentuvat - osaa ohjatusti vaihtaa laitteiden salasanat, myöhemmin myös itsenäisesti. ', done: false },
    { id: 6, text: 'Oppii ymmärtämään opettajan kuvauksesta mitä käsitteet tekijä, teos, oikeus ja tekijänoikeus tarkoittavat.', done: false },
    { id: 7, text: 'Oppii kertomaan positiivisista ja negatiivisista kokemuksista digitaalisissa ympäristöissä - oppilas kunnioittaa ja huomioi muita toimiessaan digitaalisissa ympäristöissä. - toimii kiusaamista ehkäisevästi.', done: false },
    { id: 8, text: 'Harjoittelee työskentelemään tavoitteellisesti.', done: false },
    { id: 9, text: 'Oppii ymmärtämään ergonomian tärkeyden ja harjoittelee säätämään työskentelyasentoa ja vaihtamaan työympäristöä. ', done: false },
    { id: 10, text: 'Tiedostaa ja opettelee: - säätämään näytön kirkkautta, resoluutiota ja väriä sekä äänenvoimakkuutta - valitsemaan fyysistä aktiivisuutta lisääviä liikkeitä eri vaihtoehdoista ja vaihtaa työskentelyasentoa ja -liikettä tarpeen mukaan - valikoimaan ergonomian kannalta parhaan työpisteen ja – välineen. ', done: false },
  ]);

const screenId = 'screen7';

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