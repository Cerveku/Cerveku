import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function FeedbackBox({ hideFeedback }) {
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    // Tässä kohtaa voit lähettää palautteen tietokantaan, API:in, jne.
    Alert.alert('Kiitos palautteestasi!', feedback,[
    {
        text: 'OK',
        onPress: () => {
          setFeedback('');
          hideFeedback(); // Piilota palautekenttä
        },
      },
    ]);
  };

  return (
    <View style={{ margin: 20 }}>
      <TextInput
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
          backgroundColor: 'white'  // Tämä rivi tekee taustan valkoiseksi
        }}
        onChangeText={text => setFeedback(text)}
        value={feedback}
        placeholder="Kirjoita palautteesi tähän"
        multiline
      />
      <Button
        title="Lähetä palaute"
        onPress={submitFeedback}
      />
    </View>
  );
}
