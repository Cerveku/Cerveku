import pandas as pd
from collections import defaultdict

# Määritä täysi polku Excel-tiedostoon
tiedosto_sijainti = "oppilaat.xlsx"

# Luetaan tiedot DataFrameen
df = pd.read_excel(tiedosto_sijainti)  # Esimerkissä käytetään valmiiksi ladattua dataa

# Luokkien maksimikoko
max_koko = 20

# Alustetaan luokat
luokat = defaultdict(list)
luokat['XX'] = []

# Funktio, joka tarkistaa, voiko oppilaan lisätä tiettyyn luokkaan
def voi_lisata(luokka, oppilas, df):
     # Erikoistapaus luokalle 'XX'
    if luokka == 'XX':
        return True
    for o in luokat[luokka]:
        # Tarkistetaan, onko sääntö, että näitä kahta ei voi olla samassa luokassa
        if df.loc[o, 'D'] == 1 and df.loc[oppilas, 'D'] == 1:
            return False
    return True

# Lisätään kaikki tuen tarpeen 5 oppilaat suoraan luokkaan 'XX'
for index, oppilas in df[df['C'] == 5].iterrows():
    luokat['XX'].append(index)

# Järjestetään oppilaat Suomen kielen tason ja tuen tarpeen mukaan
df_sorted = df[df['C'] != 5].sort_values(by=['B', 'C'], ascending=[True, True])

# Käydään läpi jokainen oppilas
for index, oppilas in df_sorted.iterrows():
    lisatty = False
    for luokka in luokat.keys():
         # Ei lisätä oppilaita luokkaan 'XX', koska se on varattu tuen tarpeen 5 oppilaille
        if luokka == 'XX':
            continue
        # Tarkistetaan, mahtuuko oppilas luokkaan ja voiko hänet lisätä siihen
        if len(luokat[luokka]) < max_koko and voi_lisata(luokka, index, df):
            luokat[luokka].append(index)
            lisatty = True
            break
    # Jos oppilasta ei ole lisätty mihinkään olemassa olevaan luokkaan, luodaan uusi luokka
    if not lisatty:
        uusi_luokka = chr(65 + len(luokat))  # A, B, C, jne.
        luokat[uusi_luokka].append(index)

# Alustetaan tiedosto, johon tulokset kirjoitetaan
tiedostonimi = "luokkajako.txt"

# Avataan tiedosto kirjoitusta varten
with open(tiedostonimi, "w", encoding="utf-8") as tiedosto:
    # Käydään läpi kaikki luokat ja niiden oppilaat
    for luokka, oppilaat in luokat.items():
        # Kirjoitetaan luokan nimi tiedostoon
        tiedosto.write(f"Luokka: {luokka}\n")
        # Käydään läpi kaikki luokan oppilaat
        for oppilas in oppilaat:
            # Haetaan oppilaan tiedot DataFramesta
            oppilaan_tiedot = df.loc[oppilas]
            # Kirjoitetaan oppilaan tiedot tiedostoon
            tiedosto.write(f"- {oppilaan_tiedot['A']} (Kielen taso: {oppilaan_tiedot['B']}, Tuen tarve: {oppilaan_tiedot['C']}, Erikoisehto:{oppilaan_tiedot['D']})\n")
        # Lisätään tyhjä rivi luokkien välille
        tiedosto.write("\n")

print(f"Luokkajako tallennettu tiedostoon {tiedostonimi}")
