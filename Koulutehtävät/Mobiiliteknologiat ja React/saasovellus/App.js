import React from 'react';
import { View, StyleSheet } from 'react-native';
import Position from './components/Position';

export default function App() {
  return (
    <View style={styles.container}>
      <Position />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Musta tausta
  },
});
