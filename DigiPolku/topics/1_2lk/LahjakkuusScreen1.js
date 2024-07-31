import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LahjakkuusScreen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Osaa auttaa muita oppilaita ongelmatilanteissa.', done: false },
    { id: 2, text: 'Tuntee osan tekniikkaan liittyvistä suureista ja mittayksiköistä.', done: false },
    { id: 3, text: 'Osaa ratkaista digitaalisten työkalujen tavallisia ongelmatilanteita.', done: false },
    { id: 4, text: 'Osaa ladata ja käyttää sallittuja sovelluksia.', done: false },
    { id: 5, text: 'Ymmärtää digitaalisten työkalujen asetuksia ja osaa säätää niitä asianmukaisella tavalla.', done: false },
    { id: 6, text: 'Käyttää teknologian käsitteitä.', done: false },
    { id: 7, text: 'Osaa käyttää kosketusnäyttökynää tarkoituksenmukaisesti.', done: false },
    { id: 8, text: 'Oppilas löytää uusia tapoja ilmaista itseään digitalisuutta monipuolisesti hyödyntäen.', done: false },
    { id: 9, text: 'Tuottaa itsenäisesti kuvaa, ääntä, tekstiä ja videota sisältäviä tuotoksia erilaisissa digitaalisissa ympäristöissä.', done: false },
    { id: 10, text: 'Kokoaa ja tulkitsee erilaisia taulukoita ja kaavioita.', done: false },
    { id: 11, text: 'Osaa luoda 3D-malleja ja -tulosteita.', done: false },
    { id: 12, text: 'Osaa digitoida fyysisiä luovan työskentelyn tuotoksia.', done: false },
    { id: 13, text: 'Osaa käyttää oppimista edistäviä digitaalisia ympäristöjä.', done: false },
    { id: 14, text: 'Innostaa muita luovaan työskentelyyn.', done: false },
    { id: 15, text: 'Kannustaa muita oppilaita yhteisöllisyyteen.', done: false },
    { id: 16, text: 'Tuntee ja osaa käyttää eri tunnistuskeinoja.', done: false },
    { id: 17, text: 'Oppilas on kiinnostunut tekniikasta - joka kannustaa liikkumiseen ja motivoi esimerkillään muita liikkumaan - jota käytetään tutkimuksiin.', done: false },
    { id: 18, text: 'Osaa etsiä oma-aloitteisesti tietoa omista kiinnostuksen kohteistaan. - opettelee arvioimaan tiedon luotettavuutta.', done: false },
  ]);

const screenId = 'screen1';

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

export default LahjakkuusScreen1;