# ISCool

ISCool on Kotlinilla luotu Android-peli, jossa pelaajan tehtävänä on klikata näyttöä, kun kuvassa näkyy aurinkolasit.

## Pelin toiminnallisuus

### StartGameScreen

StartGameScreen on pelin aloitusnäyttö, joka sisältää seuraavat elementit:
- Pelin logo
- Ohjeteksti
- Pelin aloitusnappi

Käyttöliittymä on toteutettu `Column`-komponentilla, joka keskittää sisällön vaakasuunnassa ja asettaa sen pystysuunnassa ylös.

### PlayGameScreen

PlayGameScreen on pelin pääasiallinen pelinäyttö, joka sisältää:
- Keskeytys- ja uudelleenkäynnistysnapit
- Kuva ja klikkausnappi

Pelaajan tehtävänä on klikata nappia, kun kuvassa näkyy aurinkolasit. Kuvia näytetään tietyin aikavälein, ja aikaväli pienenee pelin edetessä. Pelaajan pisteet kasvavat, kun hän onnistuu klikkaamaan oikeaa kuvaa.

### EndGameScreen

EndGameScreen on pelin lopetusnäyttö, jossa näytetään pelaajan saavuttamat pisteet ja mahdollisuus:
- Pelata uudelleen
- Jakaa pisteet muiden kanssa
- Näyttää parhaat pisteet

Animaatioita käytetään tekstien ja elementtien näyttämiseen sujuvasti.

## Asennus ja käyttöönotto
- Kloonaa repositorio:
- git clone https://github.com/kayttajanimi/iscool.git
- Avaa projekti Android Studiossa.
- Käännä ja suorita sovellus laitteella tai emulaattorilla.

## Käyttöohjeet
- Avaa sovellus.
- Lue ohjeet aloitusnäytöltä ja paina "Play".
- Klikkaa nappia, kun näet aurinkolasit kuvassa.
- Peli päättyy, jos klikkaat väärää kuvaa tai et klikkaa oikeaa kuvaa ajoissa.
- Katso saavutetut pisteet ja parhaat pisteet lopetusnäytöltä.
- Paina "Play Again" pelataksesi uudelleen tai "Share Your Score" jakaaksesi pisteet.

## Lisenssi 
Tämä projekti on lisensoitu MIT-lisenssillä