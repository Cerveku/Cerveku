import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartScreen from './StartScreen'; // Tämä on tiedosto, jonka annoit
import TopicScreen from './TopicScreen'; // Luotava tiedosto
import Grade1_2Screen from './Grade1_2Screen';
import Grade3_4Screen from './Grade3_4Screen';
import Grade5_6Screen from './Grade5_6Screen';
import Grade7_9Screen from './Grade7_9Screen';
import SettingsScreen from './SettingsScreen';
import PerustaidotJaTekninenOsaaminenScreen1 from'./topics/1_2lk/PerustaidotJaTekninenOsaaminenScreen1';
import PerustaidotJaTekninenOsaaminenScreen3 from'./topics/3_4lk/PerustaidotJaTekninenOsaaminenScreen3';
import PerustaidotJaTekninenOsaaminenScreen5 from'./topics/5_6lk/PerustaidotJaTekninenOsaaminenScreen5';
import PerustaidotJaTekninenOsaaminenScreen7 from'./topics/7_9lk/PerustaidotJaTekninenOsaaminenScreen7';
import TuotantoEsittaminenJaLuovatProsessitScreen1 from'./topics/1_2lk/TuotantoEsittaminenJaLuovatProsessitScreen1';
import TuotantoEsittaminenJaLuovatProsessitScreen3 from'./topics/3_4lk/TuotantoEsittaminenJaLuovatProsessitScreen3';
import TuotantoEsittaminenJaLuovatProsessitScreen5 from'./topics/5_6lk/TuotantoEsittaminenJaLuovatProsessitScreen5';
import TuotantoEsittaminenJaLuovatProsessitScreen7 from'./topics/7_9lk/TuotantoEsittaminenJaLuovatProsessitScreen7';
import OhjelmointiosaaminenScreen1 from './topics/1_2lk/OhjelmointiosaaminenScreen1';
import OhjelmointiosaaminenScreen3 from './topics/3_4lk/OhjelmointiosaaminenScreen3';
import OhjelmointiosaaminenScreen5 from './topics/5_6lk/OhjelmointiosaaminenScreen5';
import OhjelmointiosaaminenScreen7 from './topics/7_9lk/OhjelmointiosaaminenScreen7';
import VastuuTurvallisuusErgonomiaJaTerveysScreen1 from './topics/1_2lk/VastuuTurvallisuusErgonomiaJaTerveysScreen1';
import VastuuTurvallisuusErgonomiaJaTerveysScreen3 from './topics/3_4lk/VastuuTurvallisuusErgonomiaJaTerveysScreen3';
import VastuuTurvallisuusErgonomiaJaTerveysScreen5 from './topics/5_6lk/VastuuTurvallisuusErgonomiaJaTerveysScreen5';
import VastuuTurvallisuusErgonomiaJaTerveysScreen7 from './topics/7_9lk/VastuuTurvallisuusErgonomiaJaTerveysScreen7';
import TiedonhallintaJaInformaatiolukutaitoScreen1 from './topics/1_2lk/TiedonhallintaJaInformaatiolukutaitoScreen1';
import TiedonhallintaJaInformaatiolukutaitoScreen3 from './topics/3_4lk/TiedonhallintaJaInformaatiolukutaitoScreen3';
import TiedonhallintaJaInformaatiolukutaitoScreen5 from './topics/5_6lk/TiedonhallintaJaInformaatiolukutaitoScreen5';
import TiedonhallintaJaInformaatiolukutaitoScreen7 from './topics/7_9lk/TiedonhallintaJaInformaatiolukutaitoScreen7';
import VuorovaikutusKommunikaatioJaVerkostoituminenScreen1 from './topics/1_2lk/VuorovaikutusKommunikaatioJaVerkostoituminenScreen1';
import VuorovaikutusKommunikaatioJaVerkostoituminenScreen3 from './topics/3_4lk/VuorovaikutusKommunikaatioJaVerkostoituminenScreen3';
import VuorovaikutusKommunikaatioJaVerkostoituminenScreen5 from './topics/5_6lk/VuorovaikutusKommunikaatioJaVerkostoituminenScreen5';
import VuorovaikutusKommunikaatioJaVerkostoituminenScreen7 from './topics/7_9lk/VuorovaikutusKommunikaatioJaVerkostoituminenScreen7';
import MedialukutaitoScreen1 from './topics/1_2lk/MedialukutaitoScreen1';
import MedialukutaitoScreen3 from './topics/3_4lk/MedialukutaitoScreen3';
import MedialukutaitoScreen5 from './topics/5_6lk/MedialukutaitoScreen5';
import MedialukutaitoScreen7 from './topics/7_9lk/MedialukutaitoScreen7';
import LahjakkuusScreen1 from './topics/1_2lk/LahjakkuusScreen1';
import LahjakkuusScreen3 from './topics/3_4lk/LahjakkuusScreen3';
import LahjakkuusScreen5 from './topics/5_6lk/LahjakkuusScreen5';
import LahjakkuusScreen7 from './topics/7_9lk/LahjakkuusScreen7';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="Aloitusnäyttö" component={StartScreen} />
        <Stack.Screen name="TopicScreen" component={TopicScreen} />
        <Stack.Screen name="1-2 LK" component={Grade1_2Screen} />
        <Stack.Screen name="3-4 LK" component={Grade3_4Screen} />
        <Stack.Screen name="5-6 LK" component={Grade5_6Screen} />
        <Stack.Screen name="7-9 LK" component={Grade7_9Screen} />
        <Stack.Screen name="Asetukset" component={SettingsScreen} />
        <Stack.Screen name="Perustaidot Ja ... 1-2 LK" component={PerustaidotJaTekninenOsaaminenScreen1} />
        <Stack.Screen name="Perustaidot Ja ... 3-4 LK" component={PerustaidotJaTekninenOsaaminenScreen3} />
        <Stack.Screen name="Perustaidot Ja ... 5-6 LK" component={PerustaidotJaTekninenOsaaminenScreen5} />
        <Stack.Screen name="Perustaidot Ja ... 7-9 LK" component={PerustaidotJaTekninenOsaaminenScreen7} />
        <Stack.Screen name="Tuotanto Ja ... 1-2 LK" component={TuotantoEsittaminenJaLuovatProsessitScreen1} />
        <Stack.Screen name="Tuotanto Ja ... 3-4 LK" component={TuotantoEsittaminenJaLuovatProsessitScreen3} />
        <Stack.Screen name="Tuotanto Ja ... 5-6 LK" component={TuotantoEsittaminenJaLuovatProsessitScreen5} />
        <Stack.Screen name="Tuotanto Ja ... 7-9 LK" component={TuotantoEsittaminenJaLuovatProsessitScreen7} />
        <Stack.Screen name="Ohjelmointiosaaminen 1-2 LK" component={OhjelmointiosaaminenScreen1} />
        <Stack.Screen name="Ohjelmointiosaaminen 3-4 LK" component={OhjelmointiosaaminenScreen3} />
        <Stack.Screen name="Ohjelmointiosaaminen 5-6 LK" component={OhjelmointiosaaminenScreen5} />
        <Stack.Screen name="Ohjelmointiosaaminen 7-9 LK" component={OhjelmointiosaaminenScreen7} />
        <Stack.Screen name="Vastuu Ja ... 1-2 LK" component={VastuuTurvallisuusErgonomiaJaTerveysScreen1} />
        <Stack.Screen name="Vastuu Ja ... 3-4 LK" component={VastuuTurvallisuusErgonomiaJaTerveysScreen3} />
        <Stack.Screen name="Vastuu Ja ... 5-6 LK" component={VastuuTurvallisuusErgonomiaJaTerveysScreen5} />
        <Stack.Screen name="Vastuu Ja ... 7-9 LK" component={VastuuTurvallisuusErgonomiaJaTerveysScreen7} />
        <Stack.Screen name="Tiedonhallinta Ja ... 1-2 LK" component={TiedonhallintaJaInformaatiolukutaitoScreen1} />
        <Stack.Screen name="Tiedonhallinta Ja ... 3-4 LK" component={TiedonhallintaJaInformaatiolukutaitoScreen3} />
        <Stack.Screen name="Tiedonhallinta Ja ... 5-6 LK" component={TiedonhallintaJaInformaatiolukutaitoScreen5} />
        <Stack.Screen name="Tiedonhallinta Ja ... 7-9 LK" component={TiedonhallintaJaInformaatiolukutaitoScreen7} />
        <Stack.Screen name="Vuorovaikutus Ja ... 1-2 LK" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen1} />
        <Stack.Screen name="Vuorovaikutus Ja ... 3-4 LK" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen3} />
        <Stack.Screen name="Vuorovaikutus Ja ... 5-6 LK" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen5} />
        <Stack.Screen name="Vuorovaikutus Ja ... 7-9 LK" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen7} />
        <Stack.Screen name="Medialukutaito 1-2 LK" component={MedialukutaitoScreen1} />
        <Stack.Screen name="Medialukutaito 3-4 LK" component={MedialukutaitoScreen3} />
        <Stack.Screen name="Medialukutaito 5-6 LK" component={MedialukutaitoScreen5} />
        <Stack.Screen name="Medialukutaito 7-9 LK" component={MedialukutaitoScreen7} />
        <Stack.Screen name="Lahjakkuus 1-2 LK" component={LahjakkuusScreen1} />
        <Stack.Screen name="Lahjakkuus 3-4 LK" component={LahjakkuusScreen3} />
        <Stack.Screen name="Lahjakkuus 5-6 LK" component={LahjakkuusScreen5} />
        <Stack.Screen name="Lahjakkuus 7-9 LK" component={LahjakkuusScreen7} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

