import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerustaidotJaTekninenOsaaminen1 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Tuntee median käsitteen ja osaa nimetä joitain kuvaa, liikkuvaa kuvaa ja ääntä sekä näiden yhdistelmiä sisältäviä mediasisältöjä, kuten digitaalinen peli tai video.', done: false },
    { id: 2, text: 'Harjoittelee lukemaan mediasisältöjä, joissa on kirjoitettua tekstiä. Oppilas tutustuu esimerkiksi sarjakuvaan.', done: false },
    { id: 3, text: 'Ymmärtää faktan ja fiktion eron ja jaottelee mediasisältöjä ohjatusti todenmukaisiin ja kuvitteellisiin sekä antaa niistä jonkin esimerkin. Oppilas ymmärtää, että mediasisällöillä on tekijä.', done: false },
    { id: 4, text: 'Ymmärtää, että mediasisällöillä on erilaisia käyttötarkoituksia, kuten tietoa välittävä tai viihdyttävä tarkoitus. Oppilas osaa antaa sisällöistä jonkin esimerkin.', done: false },
    { id: 5, text: 'Harjoittelee ymmärtämään ja tulkitsemaan kuvaa ja ääniympäristöä. Oppilas tekee huomioita havainnoistaan ja kokemuksistaan.', done: false },
    { id: 6, text: 'Osaa kuvailla mediasisällön tapahtumia ja hahmoja tai siinä esitettyjä asioita oman ilmaisun keinoin.', done: false },
    { id: 7, text: 'Tulee tietoiseksi median vaikutuksista yksilön ajatteluun ja toimintaan, kuten käsityksiin asioista ja kiinnostuksenkohteisiin. Oppilas osaa antaa jonkin esimerkin omasta elämästään.', done: false },
    { id: 8, text: 'Havainnoi ohjatusti median luomia yleistyksiä asioista. Oppilas tarkastelee esimerkiksi elokuvien tai pelien hahmoja.', done: false },
    { id: 9, text: 'Tietää, että mediaa käytetään vaikuttamiseen ja osaa nimetä jonkin vaikuttavan mediasisällön, kuten mainokset.', done: false },
    { id: 10, text: 'Osaa ohjatusti etsiä tietoa joistain digitaalisista mediasisällöistä käyttämällä hakukonetta ja hakusanoja.', done: false },
    { id: 11, text: 'Osaa käyttää mediaa välineenä ympäristöä ja asioita tutkiessaan.', done: false },
    { id: 12, text: 'Ymmärtää tietopohjaisten ja kuvitteellisten mediasisältöjen erilaista luonnetta tietolähteenä. Oppilas ymmärtää, että kaikki mediasta löytyvä tieto ei ole käyttökelpoista tai luotettavaa.', done: false },
    { id: 13, text: 'Tutustuu tietoa välittäviin mediasisältöihin, kuten uutiset.', done: false },
    { id: 14, text: 'Osaa kertoa itseään kiinnostavista mediasisällöistä ja tilanteista, joissa käyttää mediaa eri tavoin.', done: false },
    { id: 15, text: 'Ymmärtää, että on erilaisia mediamakuja ja tapoja käyttää mediaa.', done: false },
    { id: 16, text: 'Laatii ohjatusti jonkin yksinkertaisen luovan mediasisällön, kuten digitarinan tai videon.', done: false },
    { id: 17, text: 'Osaa ohjatusti käyttää tarvittavia mediavälineitä, sovelluksia ja ohjelmia mediasisältöjen tuottamisessa.', done: false },
    { id: 18, text: 'Käyttää ohjatusti tekstiä, kuvaa, liikkuvaa kuvaa tai ääntä omassa tuottamisessaan ja hyödyntää niitä ilmaisun ja kerronnan keinoina.', done: false },
    { id: 19, text: 'Suunnittelee ja toteuttaa mediasisällön ohjatusti yhdessä toisten kanssa. Oppilas arvioi tuottamista keskustelemalla yhteisesti sen mielekkäistä ja haastavista vaiheista sekä opituista asioista.', done: false },
    { id: 20, text: 'Harjoittelee antamaan rakentavaa palautetta toisten töistä ja vastaanottamaan palautetta.', done: false },
    { id: 21, text: 'Ilmaisee omia ajatuksiaan ja mielipiteitään median avulla.', done: false },
    { id: 22, text: 'Tuottaa ohjatusti jonkin yksinkertaisen vaikuttavan mediasisällön, kuten mainos.', done: false },
    { id: 23, text: 'Käyttää ohjatusti jotain vaikuttamisen keinoa, kuten toistoa tai huumoria.', done: false },
    { id: 24, text: 'Laatii ohjatusti yksinkertaisen tietoa välittävän mediasisällön, kuten uutiskuvan tai kuvatekstin.', done: false },
    { id: 25, text: 'Hahmottaa todenperäisten ja kuvitteellisten mediasisältöjen erilaista tuottamisen tapaa oman tekemisen kautta esimerkiksi kokeilemalla vihreän kankaan tekniikkaa.', done: false },
    { id: 26, text: 'Esittää ja välittää ohjatusti löytämäänsä tietoa mediaesityksen kautta esimerkiksi luokan käyttämällä digitaalisella alustalla.', done: false },
    { id: 27, text: 'Löytää mielekkäitä tapoja tuottaa mediasisältöjä ja rohkaistuu mediasisältöjen tekemiseen itsenäisesti ja yhdessä toisten kanssa.', done: false },
    { id: 28, text: 'Ymmärtää, että mediateosten mahdolliseen julkaisemiseen liittyvistä asioista tulee keskustella myös aikuisten, erityisesti huoltajien, kanssa omien ja muiden oikeuksien suojaamiseksi.', done: false },
    { id: 29, text: 'Tietää, miksi on tärkeää suojata yksityisyyttään ja tietojaan. Oppilas osaa kertoa, mitä asioita voi ja mitä ei ole hyvä jakaa verkossa. Oppilas tulee tietoiseksi tietojenkalastelusta ja siitä, että internetissä voi kohdata myös epäasiallisia tai laittomia yhteydenottoja.', done: false },
    { id: 30, text: 'Tietää, kuinka toimia, jos saa verkossa asiattomia viestejä tai yhteydenottoja tuntemattomilta ihmisiltä. Oppilas osaa kääntyä turvallisen aikuisen puoleen.', done: false },
    { id: 31, text: 'Tunnistaa kuvaohjelmien ikärajat ja tietää, että ikärajoja on myös sovelluksilla ja palveluilla, kuten sosiaalisen median palveluilla. Oppilas ymmärtää ikärajojen tarkoituksen ja kunnioittaa niitä mediasisältöjä käyttäessään.', done: false },
    { id: 32, text: 'Ymmärtää, millä tavalla mediavälineitä on sopivaa käyttää ja että käytöstä voidaan sopia eri tilanteissa.', done: false },
    { id: 33, text: 'Ymmärtää, millaisten viestien välittäminen ja sisältöjen jakaminen on sopivaa ja millaisten ei. Oppilas tiedostaa, että julkaistuista sisällöistä jää jälki ja että kertaalleen julkaistuja sisältöjä saatetaan edelleen levittää.', done: false },
    { id: 34, text: 'Ymmärtää, että median parissa on pyrittävä toimimaan siten, ettei itselle eikä toisille tule pahaa mieltä. Oppilas antaa jonkin esimerkin.', done: false },
    { id: 35, text: 'Tutustuu tekijänoikeuksiin ja ymmärtää, miksi niitä tarvitaan. Oppilas tietää, että toisen tekemää sisältöä ei saa esittää omanaan.', done: false },
    { id: 36, text: 'Ymmärtää, että osa digitaalisista tuotteista esimerkiksi peleissä voi olla maksullisia ja että pelaajia voidaan sitouttaa pelaamiseen eri tavoin. Oppilas ymmärtää, että sisältöjen käytöstä tulee sopia huoltajan kanssa', done: false },
    { id: 37, text: 'Tunnistaa, millaiset asiat omassa median käytössä tuottavat iloa ja millaiset asiat saavat aikaan pahaa oloa. Oppilas oppii huomioimaan omaa hyvinvointiaan mediasisältöjä valitessaan', done: false },
    { id: 38, text: 'Tarkastelee ohjattuna omaa mediankäyttöään arjessa. Oppilas ymmärtää, että median käyttömäärää tulee hallita, jotta se ei vie aikaa muilta tärkeiltä asioilta, kuten liikkuminen ja uni.', done: false },
    { id: 39, text: 'Osaa tunnistaa tunteitaan ja säädellä niitä viestintätilanteissa mediaympäristöissä.', done: false },
    { id: 40, text: 'Ymmärtää viestinnän vastavuoroisuuden mediaympäristöissä: omalla viestinnällä on vaikutusta toisen viestintään, tunteisiin ja toimintaan.', done: false },
    { id: 41, text: 'Tietää, millaista on verkossa tapahtuva kiusaaminen, kuten ryhmistä sulkeminen, kuvien ja tietojen levittäminen ilman lupaa tai perättömien huhujen kertominen toisista. Oppilas tietää, ettei verkossa saa kiusata ja miten pitää toimia kiusaamista kohdatessa.', done: false },
    { id: 42, text: 'Osaa käyttää mediavälineitä viestintään.', done: false },
    { id: 43, text: 'Osaa kertoa itseään kiinnostavista mediasisällöistä ja tilanteista, joissa käyttää mediaa eri tavoin.', done: false },
    { id: 44, text: 'Ymmärtää, että erilaisiin tilanteisiin ja ympäristöihin, kuten kouluun ja vapaa-aikaan, kuuluu erilaisia viestinnän tapoja ja että viestinnän tavoista voidaan sopia yhteisesti.', done: false },
  ]);

const screenId = 'screen2';

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