import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

const TopicScreen = ({ route }) => {
  const { grade, topic, DynamicScreen } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valittu luokka-aste: {grade}</Text>
      {DynamicScreen && <DynamicScreen />}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default TopicScreen;
