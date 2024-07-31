# Luokkajako-sovellus

Luokkajako-sovellus on Python-sovellus, joka lukee oppilaiden tiedot Excel-tiedostosta ja tekee luokkajaon oppilaille. Sovellus pyrkii luomaan 20 oppilaan luokkia, ottaen huomioon oppilaiden kielentason ja tuen tarpeen.

## Ominaisuudet

- Lajittelee oppilaat kielentason ja tuen tarpeen perusteella
- Luo 20 oppilaan luokkia
- Huomioi erityisen tuen tarpeessa olevat oppilaat ja sijoittaa heidät erilliseen luokkaan
- Kirjoittaa tulokset tekstitiedostoon

## Käyttöohjeet

1. **Valmistele Excel-tiedosto:**
   - Luo Excel-tiedosto nimeltä `oppilaat.xlsx`.
   - Nimeä ensimmäisen rivin sarakkeet seuraavasti: `A`, `B`, `C`, `D`.
     - `A` sarake: Oppilaan nimi.
     - `B` sarake: Kielentaso (0 ja siitä eteenpäin).
     - `C` sarake: Tuen tarve (0-5). 
       - `0`: Tukea ei tarvita.
       - `1-4`: Tuen tarve kasvaa numeroarvon mukaan.
       - `5`: Oppilas sijoitetaan erilliseen erikoisluokkaan.
     - `D` sarake: Erityisehto (tyhjä jos ei tarvetta). Anna numero niille oppilaille, joita ei haluta samalle luokalle.

2. **Suorita sovellus:**
   - Varmista, että `oppilaat.xlsx` on samassa hakemistossa sovelluksen kanssa.
   - Suorita sovellus Python-tulkilla:
     ```bash
     python luokkajako.py
     ```

3. **Tulokset:**
   - Tulokset tallennetaan tekstitiedostoon `luokkajako.txt`.
   - Tiedosto sisältää luokittain listatut oppilaat, heidän kielentasonsa, tuen tarpeensa ja mahdolliset erityisehdot.

## Esimerkki Excel-tiedostosta

| A          | B  | C  | D |
|------------|----|----|---|
| Oppilas1   | 3  | 2  | 1 |
| Oppilas2   | 2  | 4  | 2 |
| Oppilas3   | 1  | 5  |   |
| Oppilas4   | 3  | 0  | 1 |
| Oppilas5   | 2  | 3  |   |
| ...        | ...| ...|...|

## Sovelluksen logiikka

1. **Erikoisluokka:** Kaikki tuen tarpeessa 5 olevat oppilaat lisätään suoraan erikoisluokkaan 'XX'.
2. **Lajittelu:** Jäljelle jääneet oppilaat lajitellaan kielentason ja tuen tarpeen mukaan.
3. **Luokkiin lisääminen:** Oppilaat lisätään luokkiin huomioiden luokkien maksimikoko ja mahdolliset erityisehdot.
4. **Uudet luokat:** Jos oppilasta ei voida lisätä olemassa olevaan luokkaan, luodaan uusi luokka.

## Lisenssiehdot

Product by Cerveku  

## Tekijät

- Cerveku (https://github.com/cerveku)
