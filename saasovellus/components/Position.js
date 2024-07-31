import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Weather from './Weather';

export default function Position() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.positionContainer}>
      {loading ? (
        <Text style={styles.positionText}>Retrieving position...</Text>
      ) : location ? (
        <>
          <Text style={styles.positionText}>
            Current Location: {location.coords.latitude}, {location.coords.longitude}
          </Text>
          <Weather latitude={location.coords.latitude} longitude={location.coords.longitude} />
        </>
      ) : (
        <Text style={styles.positionText}>Could not retrieve position</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  positionContainer: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    margin: 10,
  },
  positionText: {
    fontSize: 18,
    color: '#FF9800',
  },
});