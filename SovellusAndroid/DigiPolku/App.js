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
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="TopicScreen" component={TopicScreen} />
        <Stack.Screen name="Grade1_2Screen" component={Grade1_2Screen} />
        <Stack.Screen name="Grade3_4Screen" component={Grade3_4Screen} />
        <Stack.Screen name="Grade5_6Screen" component={Grade5_6Screen} />
        <Stack.Screen name="Grade7_9Screen" component={Grade7_9Screen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PerustaidotJaTekninenOsaaminenScreen1" component={PerustaidotJaTekninenOsaaminenScreen1} />
        <Stack.Screen name="PerustaidotJaTekninenOsaaminenScreen3" component={PerustaidotJaTekninenOsaaminenScreen3} />
        <Stack.Screen name="PerustaidotJaTekninenOsaaminenScreen5" component={PerustaidotJaTekninenOsaaminenScreen5} />
        <Stack.Screen name="PerustaidotJaTekninenOsaaminenScreen7" component={PerustaidotJaTekninenOsaaminenScreen7} />
        <Stack.Screen name="TuotantoEsittaminenJaLuovatProsessitScreen1" component={TuotantoEsittaminenJaLuovatProsessitScreen1} />
        <Stack.Screen name="TuotantoEsittaminenJaLuovatProsessitScreen3" component={TuotantoEsittaminenJaLuovatProsessitScreen3} />
        <Stack.Screen name="TuotantoEsittaminenJaLuovatProsessitScreen5" component={TuotantoEsittaminenJaLuovatProsessitScreen5} />
        <Stack.Screen name="TuotantoEsittaminenJaLuovatProsessitScreen7" component={TuotantoEsittaminenJaLuovatProsessitScreen7} />
        <Stack.Screen name="OhjelmointiosaaminenScreen1" component={OhjelmointiosaaminenScreen1} />
        <Stack.Screen name="OhjelmointiosaaminenScreen3" component={OhjelmointiosaaminenScreen3} />
        <Stack.Screen name="OhjelmointiosaaminenScreen5" component={OhjelmointiosaaminenScreen5} />
        <Stack.Screen name="OhjelmointiosaaminenScreen7" component={OhjelmointiosaaminenScreen7} />
        <Stack.Screen name="VastuuTurvallisuusErgonomiaJaTerveysScreen1" component={VastuuTurvallisuusErgonomiaJaTerveysScreen1} />
        <Stack.Screen name="VastuuTurvallisuusErgonomiaJaTerveysScreen3" component={VastuuTurvallisuusErgonomiaJaTerveysScreen3} />
        <Stack.Screen name="VastuuTurvallisuusErgonomiaJaTerveysScreen5" component={VastuuTurvallisuusErgonomiaJaTerveysScreen5} />
        <Stack.Screen name="VastuuTurvallisuusErgonomiaJaTerveysScreen7" component={VastuuTurvallisuusErgonomiaJaTerveysScreen7} />
        <Stack.Screen name="TiedonhallintaJaInformaatiolukutaitoScreen1" component={TiedonhallintaJaInformaatiolukutaitoScreen1} />
        <Stack.Screen name="TiedonhallintaJaInformaatiolukutaitoScreen3" component={TiedonhallintaJaInformaatiolukutaitoScreen3} />
        <Stack.Screen name="TiedonhallintaJaInformaatiolukutaitoScreen5" component={TiedonhallintaJaInformaatiolukutaitoScreen5} />
        <Stack.Screen name="TiedonhallintaJaInformaatiolukutaitoScreen7" component={TiedonhallintaJaInformaatiolukutaitoScreen7} />
        <Stack.Screen name="VuorovaikutusKommunikaatioJaVerkostoituminenScreen1" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen1} />
        <Stack.Screen name="VuorovaikutusKommunikaatioJaVerkostoituminenScreen3" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen3} />
        <Stack.Screen name="VuorovaikutusKommunikaatioJaVerkostoituminenScreen5" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen5} />
        <Stack.Screen name="VuorovaikutusKommunikaatioJaVerkostoituminenScreen7" component={VuorovaikutusKommunikaatioJaVerkostoituminenScreen7} />
        <Stack.Screen name="MedialukutaitoScreen1" component={MedialukutaitoScreen1} />
        <Stack.Screen name="MedialukutaitoScreen3" component={MedialukutaitoScreen3} />
        <Stack.Screen name="MedialukutaitoScreen5" component={MedialukutaitoScreen5} />
        <Stack.Screen name="MedialukutaitoScreen7" component={MedialukutaitoScreen7} />
        <Stack.Screen name="LahjakkuusScreen1" component={LahjakkuusScreen1} />
        <Stack.Screen name="LahjakkuusScreen3" component={LahjakkuusScreen3} />
        <Stack.Screen name="LahjakkuusScreen5" component={LahjakkuusScreen5} />
        <Stack.Screen name="LahjakkuusScreen7" component={LahjakkuusScreen7} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

