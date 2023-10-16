import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Weather({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const API_KEY = '4b9e8977e2220dfc8eccda35fdd60fca';
    const apiURL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, [latitude, longitude]);

  return (
    <View style={styles.weatherContainer}>
      {weatherData ? (
        <Text style={styles.weatherText}>
          Current Weather: {weatherData.current.temperature}°C, {weatherData.current.weather_descriptions[0]}
        </Text>
      ) : (
        <Text style={styles.weatherText}>Loading weather...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    margin: 10,
  },
  weatherText: {
    fontSize: 18,
    color: '#00ACC1',
  },
});