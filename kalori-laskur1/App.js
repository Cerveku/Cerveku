import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState(1);
  const [gender, setGender] = useState('male');
  const [calories, setCalories] = useState(null);
  const [idealWeight, setIdealWeight] = useState(null);
  const [caloriesToIdeal, setCaloriesToIdeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const radio_props = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Unicorn', value: 'unicorn' },
  ];

  const calculateCalories = () => {
    if (gender === 'unicorn') {
      setModalVisible(true);
      return;
    }

    let result = 0;
    let idealBMI = 23.5;
    let heightM = parseFloat(height) / 100;

    switch(gender) {
      case 'male':
        result = (879 + 10.2 * parseFloat(weight)) * activity;
        break;
      case 'female':
        result = (795 + 7.18 * parseFloat(weight)) * activity;
        break;
      default:
        break;
    }
    
    let idealW = idealBMI * Math.pow(heightM, 2);
    let dailyCaloriesToIdeal = ((parseFloat(weight) - idealW) * 7700) / 365;

    setCalories(result);
    setIdealWeight(idealW);
    setCaloriesToIdeal(result - dailyCaloriesToIdeal);
  };

  return (
    <View style={styles.container}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Why would you want to know your calories and BMI? You're a unicorn. You're perfect as you are!</Text>
            <TouchableOpacity
              style={{ ...styles.openButton }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text>Calorie Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight.toString()}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height.toString()}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />
      <Text>Gender</Text>
      <RadioForm
        radio_props={radio_props}
        initial={0}
        onPress={(value) => setGender(value)}
      />
      <Text>Activity Level</Text>
      <Picker selectedValue={activity} onValueChange={(itemValue) => setActivity(itemValue)} style={styles.intensity}>
        <Picker.Item label="Light" value={1.3} />
        <Picker.Item label="Usual" value={1.5} />
        <Picker.Item label="Moderate" value={1.7} />
        <Picker.Item label="Hard" value={2} />
        <Picker.Item label="Very Hard" value={2.2} />
      </Picker>
      <Button title="Calculate" onPress={calculateCalories} />
      {calories !== null && <Text>Estimated daily calories: {calories.toFixed(0)}</Text>}
      {idealWeight !== null && <Text>Ideal weight according to BMI: {idealWeight.toFixed(2)} kg</Text>}
      {caloriesToIdeal !== null && <Text>Calories to consume to reach ideal weight in 1 year: {caloriesToIdeal.toFixed(0)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    padding: 20,
    margin: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 8,
  },
  intensity: {
    alignSelf: 'stretch',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});