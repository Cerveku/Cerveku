# Pankkiautomaattisovellus

Tämä pankkiautomaatti-sovellus tarjoaa käyttäjille mahdollisuuden hoitaa pankkitoimia helposti ja turvallisesti. Sovellus koostuu sekä frontend- että backend-ominaisuuksista, jotka tarjoavat seuraavat toiminnot:

## Ominaisuudet

### Backend

- **Käyttäjän tunnistaminen ja kirjautuminen**
  - JWT (JSON Web Token) -pohjainen autentikointi.
  - Kirjautumisreitti (`/login`), joka ei vaadi autentikointia.

- **Käyttäjänhallinta**
  - Reitit käyttäjätietojen hakemiseen ja päivittämiseen (`/user`).

- **Tilien hallinta**
  - Reitit käyttäjätilien hakemiseen ja päivittämiseen (`/account`).

- **Korttien hallinta**
  - Reitit pankkikorttien tietojen hakemiseen ja päivittämiseen (`/card`).

- **Lokitietojen hallinta**
  - Reitit transaktio- ja tapahtumalokitietojen hakemiseen (`/log`).

- **Reittien suojaus**
  - Kaikki reitit (paitsi `/login`) on suojattu autentikoinnilla.
  - Tokenin validointi jokaisessa pyynnössä.

### Frontend

- **Käyttäjäystävällinen käyttöliittymä**
  - Maksimoi ikkuna ja sisältää taustagrafiikan.

- **Käyttäjän tietojen näyttäminen**
  - Hakee ja näyttää käyttäjän nimen ja asiakastiedot.

- **Tilien hallinta**
  - Hakee ja näyttää käyttäjän tilitiedot pankkikortin numeron perusteella.
  - Erottaa käyttötilin ja luottotilin tiedot.

- **Transaktiot**
  - Mahdollisuus nostaa rahaa.
  - Mahdollisuus tarkistaa tilin saldo.
  - Mahdollisuus tarkastella tilitapahtumia.
  - Mahdollisuus siirtää rahaa tililtä toiselle.

- **Istuntohallinta**
  - Istunnon aikakatkaisun hallinta ajastimella.
  - Kirjaa käyttäjän ulos automaattisesti tietyn ajan kuluttua toimettomuudesta.
  - Mahdollisuus nollata istuntoajastin käyttäjän toiminnan perusteella.

- **Monipuolinen näkymien hallinta**
  - Näyttää eri näkymiä (nosto, saldo, tapahtumat, rahan siirto) stacked widgetin avulla.

### Yleiset ominaisuudet

- **Käyttäjätoiminnan seuranta**
  - Seuraa käyttäjän toimintaa ja nollaa ajastimen toiminnan perusteella.

- **Tietoturva**
  - Käyttää Bearer-tokenia API-pyyntöjen autentikointiin.
  - Tarkistaa ja validioi tokenin jokaisessa pyyntöyhteydessä.

- **Helppokäyttöisyys**
  - Sujuva siirtyminen eri toimintojen ja näkymien välillä.
  - Visuaalisesti miellyttävä käyttöliittymä taustakuvan ja selkeiden valikkojen avulla.

- **Käytettävyys**
  - Sovelluksen käyttö on suunniteltu mahdollisimman sujuvaksi ja käyttäjäystävälliseksi, tarjoten kaikki tarvittavat pankkipalvelut yhdestä käyttöliittymästä.

## Asennus

1. **Backend:**
   - Varmista, että Node.js ja npm ovat asennettuna.
   - Asenna tarvittavat npm-paketit komennolla `npm install`.
   - Käynnistä backend-sovellus komennolla `npm start`.

2. **Frontend:**
   - Varmista, että Qt on asennettu ja konfiguroitu.
   - Käännä ja suorita frontend-sovellus Qt:n työkalujen avulla.

## Lisenssi

MIT License

Copyright (c) 2022 22kmo-project

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
