import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Tietosuojaseloste - Reseptisovellus</Text>
      
      <Text style={styles.sectionTitle}>1. Rekisterinpitäjä</Text>
      <Text style={styles.text}>
        Nimi: Reseptisovellus{"\n"}
        Yhteydenottotiedot: [Reseptisovelluksen yhteystiedot]
      </Text>
      
      <Text style={styles.sectionTitle}>2. Rekisteröidyt</Text>
      <Text style={styles.text}>
        Tämä tietosuojaseloste kattaa kaikki henkilötiedot, joita keräämme sovelluksen käyttäjiltä, 
        yhteistyökumppaneilta ja muilta sidosryhmiltämme.
      </Text>
      
      <Text style={styles.sectionTitle}>3. Henkilötietojen käyttötarkoitus</Text>
      <Text style={styles.text}>
        Keräämme henkilötietoja seuraaviin tarkoituksiin:{"\n"}
        - Sovelluksen toiminnallisuuden ja käyttäjäkokemuksen parantaminen{"\n"}
        - Räätälöidyn sisällön ja mainonnan tarjoaminen{"\n"}
        - Asiakaspalvelun tarjoaminen ja käyttäjätuen parantaminen{"\n"}
        - Markkinatutkimus ja analytiikka{"\n"}
        - Lainsäädännön vaatimusten noudattaminen
      </Text>
      
      <Text style={styles.sectionTitle}>4. Käsiteltävät henkilötiedot</Text>
      <Text style={styles.text}>
        Käsittelemme muun muassa seuraavia henkilötietoja:{"\n"}
        - Henkilötiedot: Nimi, syntymäaika, sukupuoli{"\n"}
        - Yhteystiedot: Sähköpostiosoite, puhelinnumero{"\n"}
        - Sovelluksen käyttötiedot: Kirjautumistiedot, käyttäjätoiminnot, mieltymykset{"\n"}
        - Maksutiedot: Maksutapahtumien tiedot, laskutustiedot{"\n"}
        - Tekniset tiedot: IP-osoite, laitetiedot, evästeet
      </Text>

      <Text style={styles.sectionTitle}>5. Tietojen säilytysaika</Text>
      <Text style={styles.text}>
        Henkilötietoja säilytetään niin kauan kuin on tarpeellista yllä mainittujen tarkoitusten 
        toteuttamiseksi tai niin kauan kuin laki vaatii.
      </Text>

      <Text style={styles.sectionTitle}>6. Tietojen luovutus ja siirto</Text>
      <Text style={styles.text}>
        Henkilötietoja voidaan luovuttaa kolmansille osapuolille, kuten alihankkijoille ja 
        markkinointikumppaneille, GDPR:n ja soveltuvan lainsäädännön mukaisesti. Tietoja voidaan 
        siirtää EU:n/ETA:n ulkopuolelle, mikäli tietosuoja on taattu asianmukaisin toimenpitein.
      </Text>

      <Text style={styles.sectionTitle}>7. Rekisteröidyn oikeudet</Text>
      <Text style={styles.text}>
        Rekisteröidyllä on oikeus:{"\n"}
        - Saada pääsy omiin tietoihinsa{"\n"}
        - Vaatia tietojen korjausta tai poistoa{"\n"}
        - Vastustaa tai pyytää tietojen käsittelyn rajoittamista{"\n"}
        - Siirtää tiedot järjestelmästä toiseen
      </Text>

      <Text style={styles.sectionTitle}>8. Tietoturva</Text>
      <Text style={styles.text}>
        Sitoudumme suojaamaan henkilötietoja asianmukaisin teknisin ja organisatorisin toimenpitein, 
        mukaan lukien salaus ja pääsynhallinta.
      </Text>

      <Text style={styles.sectionTitle}>9. Yhteydenotot</Text>
      <Text style={styles.text}>
        Kaikki tietosuojaan liittyvät yhteydenotot ja pyynnöt tulee osoittaa yllä mainittuihin 
        yhteystietoihin.
      </Text>

      <Text style={styles.sectionTitle}>10. Muutokset tietosuojaselosteeseen</Text>
      <Text style={styles.text}>
        Pidätämme oikeuden tehdä muutoksia tähän tietosuojaselosteeseen. Käyttäjille ilmoitetaan 
        merkittävistä muutoksista esimerkiksi sovelluksen kautta tai sähköpostitse.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default PrivacyPolicy;
