# Weather and Location App

Tämä React Native -sovellus näyttää käyttäjän nykyisen sijainnin ja sään sen perusteella. Sovellus käyttää Expo Location -moduulia sijainnin hankkimiseen ja Weatherstack API:ta säätietojen hakemiseen.

## Ominaisuudet

- **Sijaintitiedot**
  - Hakee käyttäjän nykyisen sijainnin (leveys- ja pituusasteet).
  - Näyttää käyttäjän sijainnin sovelluksessa.

- **Säätiedot**
  - Hakee säätiedot Weatherstack API:sta käyttäjän nykyiselle sijainnille.
  - Näyttää nykyisen lämpötilan ja säätilan kuvauksen.

## Teknologiat

- **React Native**
  - Rakennettu React Native -kirjastolla mobiilisovelluksen kehittämiseen.

- **Expo Location**
  - Käytetään käyttäjän sijainnin hakemiseen laitteelta.

- **Weatherstack API**
  - Käytetään säätietojen hakemiseen.

## Asennus ja Käyttö

1. **Asenna projektin riippuvuudet**
   - Varmista, että sinulla on Node.js ja npm asennettuna.
   - Suorita `npm install` asentaaksesi projektin riippuvuudet.

2. **Käynnistä sovellus Expo:lla**
   - Asenna Expo CLI, jos et ole vielä asentanut sitä: `npm install -g expo-cli`.
   - Käynnistä sovellus komennolla `expo start`.

3. **API-avaimen asetukset**
   - Muokkaa `Weather`-komponentin `API_KEY`-muuttuja vastaamaan omaa Weatherstack API -avaintasi.

## Komponentit

### `Weather`

- **Ominaisuudet**
  - Hakee säätiedot Weatherstack API:sta.
  - Näyttää nykyisen lämpötilan ja säätilan kuvauksen.

- **Propit**
  - `latitude`: Käyttäjän leveysaste.
  - `longitude`: Käyttäjän pituusaste.

### `Position`

- **Ominaisuudet**
  - Hakee käyttäjän nykyisen sijainnin Expo Location -moduulilla.
  - Näyttää sijaintitiedot ja `Weather`-komponentin säätiedot.

- **Tilat**
  - `location`: Tallenna sijaintitiedot.
  - `loading`: Näyttää latausilmoituksen, kun sijaintitietoja haetaan.

### `App`

- **Ominaisuudet**
  - Renderöi `Position`-komponentin pääsivulla.

## Tyyli

- **Yleinen tyyli**
  - Käyttää tumman taustan väriä.
  - Komponentit ovat pyöristettyjä ja niissä on pehmeä taustaväri.

## Lisenssi

MIT License

Copyright (c) 2022 22kmo-project

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
