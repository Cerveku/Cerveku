# USB Drive Encryption Tool

Tämä Python-skripti tarjoaa työkaluja tiedostojen salaamiseen ja salauksen purkamiseen USB-asemalla. Skripti etsii USB-aseman, jossa on tietty koko, ja salaa tai purkaa tiedostoja riippuen käyttäjän syöttämästä salasanasta.

## Toiminnot

1. **USB-aseman Etsiminen**
   - Etsii USB-aseman, joka on irrotettava ja jonka kokonaistila on 3,21 GB.

2. **Salaus ja Salauksen Purku**
   - Luo uuden salausavaimen (`generate_key`), vaikka tässä sitä ei käytetä.
   - Salaa tiedostoja annettujen salausten avulla (`encrypt_file`).
   - Purkaa tiedostojen salauksen (`decrypt_file`).

## Lisenssi
MIT License

Copyright (c) 2024 Cerveku

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.