# Kalori-laskuri

Kalori-laskuri on React Native -sovellus, joka auttaa käyttäjiä arvioimaan päivittäisen kaloritarpeensa ja ihannepainonsa sekä kalorimäärän, joka tarvitaan ihannepainon saavuttamiseksi vuoden aikana.

## Ominaisuudet

- Laskee päivittäisen kaloritarpeen käyttäjän painon, pituuden, sukupuolen ja aktiivisuustason perusteella.
- Näyttää ihannepainon BMI-laskelman perusteella.
- Laskee kalorimäärän, joka tarvitaan ihannepainon saavuttamiseksi vuoden aikana.
- Tukee sukupuolivaihtoehtoja: mies, nainen ja yksisarvinen.
- Näyttää humoristisen viestin yksisarvisille, koska he ovat jo täydellisiä sellaisinaan.

## Käyttöohjeet

1. Syötä paino (kg) tekstikenttään.
2. Syötä pituus (cm) tekstikenttään.
3. Valitse sukupuoli:
    - Mies
    - Nainen
    - Yksisarvinen
4. Valitse aktiivisuustaso:
    - Kevyt
    - Tavallinen
    - Kohtalainen
    - Kova
    - Erittäin kova
5. Paina "Calculate"-painiketta laskeaksesi päivittäisen kaloritarpeen ja ihannepainon.
6. Tulokset näytetään sovelluksen alaosassa.

## Asennus ja käynnistys

1. Kloonaa repositorio:
   ```bash
   git clone https://github.com/kayttajanimi/kalori-laskuri.git
2. Asenna tarvittavat riippuvuudet:
   ```
   cd kalori-laskuri
   npm install
3. Käynnistä sovellus:
   ```bash
   npx react-native run-android  # Android-laitteille
   npx react-native run-ios      # iOS-laitteille

## Lisenssi
Tämä projekti on lisensoitu MIT-lisenssillä