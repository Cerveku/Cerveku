import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const HeartRateCalculator = () => {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState(null);
  const [upperLimit, setUpperLimit] = useState(null);

  const calculateLimits = (age) => {
    if (age === '' || isNaN(age)) {
      setLowerLimit(null);
      setUpperLimit(null);
      return;
    }

    const lower = Math.floor((220 - age) * 0.65);
    const upper = Math.floor((220 - age) * 0.85);

    setLowerLimit(lower);
    setUpperLimit(upper);
  };

  const handleAgeChange = (newAge) => {
    setAge(newAge);
    calculateLimits(newAge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Calculator</Text>
      <Text style={styles.label}>Enter your age: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={handleAgeChange}
      />
      <View>
        {lowerLimit !== null && upperLimit !== null ? (
          <>
            <Text>Heart rate : {lowerLimit} - {upperLimit}</Text>
          </>
        ) : (
          <Text>Loading....</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
});

export default HeartRateCalculator;


